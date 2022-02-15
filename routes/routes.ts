import { HTTPBundle } from '@bluelibs/http-bundle';
import { authRoutes } from './auth.route';
import { todoRoutes } from './todo.route';
export * from './auth.route';
export * from './todo.route';

export const routes = new HTTPBundle({ port: 5000 });
routes.addRoutes(authRoutes);
routes.addRoutes(todoRoutes);