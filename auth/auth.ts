import { SecurityBundle, IUserPersistance, ISessionPersistance, FindAuthenticationStrategyResponse, IFieldMap, IUser, UserId, ISession, IPermissionPersistance, IPermission, IPermissionSearchFilters } from "@bluelibs/security-bundle";

const login = (user: IUser) => {
    console.log(user);
    return true;
}