import { RouteType } from '@bluelibs/http-bundle';
import { PermissionService, SecurityService, UserId } from '@bluelibs/security-bundle';
import { IUser } from '@bluelibs/security-bundle';
import bcrypt from 'bcryptjs';

declare module "@bluelibs/security-bundle" {
  export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
  }
}

export const authRoutes: Array<RouteType> = [
  /* LOGIN... */
  {
    type: "post",
    path: "/auth/login",
    async handler(container, req, res, next) {
      const securityService: SecurityService = container.get(SecurityService);
      const userDatas: Partial<IUser> = {
        email: req.body.email,
      };
      const password: string = req.body.password;
      if (userDatas.email && password) {
        /* find user with auth. strategy(in that case: 'password')... */
        securityService.findThroughAuthenticationStrategy("password", {
          email: userDatas.email
        })
          .then(async (passStrategy) => {
            /* check if password is correct or not... */
            if (passStrategy) {
              const compareResult: boolean = await bcrypt.compare(password, passStrategy?.strategy.passwordHash);
              if (compareResult) {
                const token = await securityService.login(passStrategy?.userId, {
                  /* set session datas in here... */
                  expiresIn: '2h',
                  authenticationStrategy: 'password',
                })
                res.status(200).json({ message: 'login successful', token: token });
              } else {
                res.status(401).json({ message: 'invalid credentials' });
              }
            } else {
              res.status(404).json({ message: 'user not found' });
            }
          })
          .catch((err: any) => {
            console.log(err);
            res.status(500).json({ message: 'an error occured in server' });
          })
      } else {
        res.status(400).json({ message: 'please enter email and password' });
      }
    },
  },
  /* LOGOUT... */
  {
    type: "post",
    path: "/auth/logout",
    async handler(container, req, res, next) {
      const securityService: SecurityService = container.get(SecurityService);
      const rawToken: string | undefined = req.headers.authorization;
      if (rawToken) {
        const token: string = rawToken.split(' ')[1];
        await securityService.logout(token);
        res.status(200).json({ message: 'logout successful' });
      } else {
        res.status(401).json({ message: 'invalid credentials' });
      }
    },
  },
  /* REGISTER... */
  {
    type: "post",
    path: "/auth/register",
    async handler(container, req, res, next) {
      const securityService: SecurityService = container.get(SecurityService);
      const userDatas: Partial<IUser> = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        roles: ['USER'],
        isEnabled: true
      };
      const password: string = req.body.password;
      /* create new user... */
      if (userDatas.email && userDatas.firstName && userDatas.lastName && password) {
        securityService.createUser(userDatas)
          .then(async (userID: UserId) => {
            const salt: string = await bcrypt.genSalt(13);
            const hash: string = await bcrypt.hash(password, salt);
            /* update user auth. strategy with hashed password above... */
            await securityService.updateAuthenticationStrategyData(userID, "password", {
              /* you can put here additional useful data fields... */
              email: userDatas.email,
              passwordHash: hash,
            })
            res.status(200).json({ message: 'user created successfully', userID: userID });
          })
          .catch((err: any) => {
            console.log(err);
            res.status(500).json({ message: 'an error occured in server' });
          });
      } else {
        res.status(400).json({ message: 'please enter valid fields' });
      }
    },
  },
];