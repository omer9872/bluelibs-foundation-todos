import {
  Kernel,
} from '@bluelibs/core';
import { AppBundle } from './bundles/App.bundle';
import { routes } from './routes/routes';
import { MongoBundle } from "@bluelibs/mongo-bundle";
import { SecurityBundle } from '@bluelibs/security-bundle';
import { PermissionsCollection, SecurityMongoBundle, SessionsCollection, UsersCollection } from '@bluelibs/security-mongo-bundle';
import './env';
import { PermissionService, SecurityService } from '@bluelibs/security-bundle';
import { HTTPBundle } from '@bluelibs/http-bundle';

const kernel = new Kernel({
  bundles: [
    new AppBundle(),
    new MongoBundle({
      uri: "mongodb://localhost:27017/test",
    }),
    new SecurityBundle(),
    new SecurityMongoBundle({
      usersCollection: UsersCollection,
      sessionsCollection: SessionsCollection,
      permissionsCollection: PermissionsCollection
    }),
    /* routes... */
    routes
  ]
});

kernel.init().then(() => {

  console.log("kernel is active...");
  let container = kernel.container;
  container.get(PermissionService);
  /* now you can play with container... */

});