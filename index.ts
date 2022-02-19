import {
  Kernel,
} from '@bluelibs/core';
import { AppBundle } from './bundles/App.bundle';
import { GraphQLBundle, Loader } from '@bluelibs/graphql-bundle';
import { ApolloBundle } from "@bluelibs/apollo-bundle";
import { routes } from './routes/routes';
import { MongoBundle } from "@bluelibs/mongo-bundle";
import { SecurityBundle } from '@bluelibs/security-bundle';
import { SecurityMongoBundle } from '@bluelibs/security-mongo-bundle';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import './env';

const Permissions = {
  ADMIN: "ADMIN",
  USER: "USER",
};

const kernel = new Kernel({
  bundles: [
    new AppBundle(),
    new MongoBundle({
      uri: "mongodb://localhost:27017/test",
    }),
    new GraphQLBundle(),
    new ApolloBundle({
      port: 4000,
      url: "http://localhost:4000/graphql",
      apollo: {
        plugins: [
          ApolloServerPluginLandingPageGraphQLPlayground({
            /* options */
          }),
        ],
      },

      enableSubscriptions: false,

      middlewares: [
        (req: any, res: any, next: any) => {
          console.log('mid 1...');
          next();
        },
        (req: any, res: any, next: any) => {
          console.log('mid 2...');
          next();
        }
      ],

      routes: [
        {
          type: "post", // "get", "put", "all"
          path: "/api/payment-handler/:orderId",
          handler: async (container: any, req: any, res: any) => {
            console.log('incoming request...')
          },
        },
        {
          type: "get", // "get", "put", "all"
          path: "/api",
          handler: async (container: any, req: any, res: any) => {
            console.log('incoming request...')
            res.sendStatus(200)
          },
        },
      ],

      uploads: {
        maxFileSize: 1024 * 1024 * 1000, // 1000 mega bytes, default is 10e9
        maxFiles: 10, // how many files can a user upload at once?
      },

      // Enables/disables JIT decoding for GRAPHQL
      jit: true,
    }),
    new SecurityBundle(
      {
        [Permissions.ADMIN]: {
          [Permissions.USER]: 1,
        },
      }
    ),
    new SecurityMongoBundle(),
    /* routes... */
    routes
  ]
});

kernel.init().then(() => {

  console.log("kernel is active...");
  const container = kernel.container;
  const loader = container.get(Loader);
  console.log(loader.getSchema());
  /* now you can play with container... */

});