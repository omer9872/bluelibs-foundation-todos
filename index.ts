import {
  Kernel,
  Bundle,
  Token,
} from '@bluelibs/core';

import { DatabaseService, DB_SERVICE_TOKEN } from './services/Database.service';
import { TodoService, TODO_SERVICE_TOKEN } from './services/Todo.service';
import { todoRoute } from './routes/todo.route';

import './env';

/* declare service tokens... */
export const APP_BUNDLE_SERVICE_TOKEN = new Token<AppBundle>();
class AppBundle extends Bundle {
  async prepare() {
    console.log('application bundle prepared');
    this.container.set({ id: DB_SERVICE_TOKEN, type: DatabaseService });
    this.container.set({ id: TODO_SERVICE_TOKEN, type: TodoService });
  }
  async init() {
    await this.warmup([DatabaseService]);
    await this.warmup([TodoService]);
  }
}

const kernel = new Kernel({
  bundles: [
    new AppBundle(),
    todoRoute
  ]
});

kernel.init().then(() => {
  console.log("kernel is active...");
});