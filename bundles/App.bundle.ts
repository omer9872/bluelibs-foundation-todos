import {
  Bundle,
} from '@bluelibs/core';
import { DatabaseService } from '../services/Database.service';
import { TodoService, } from '../services/Todo.service';

import { DB_SERVICE_TOKEN, TODO_SERVICE_TOKEN } from '../services/Service.tokens';

export class AppBundle extends Bundle {
  async prepare() {
    this.container.set({ id: DB_SERVICE_TOKEN, type: DatabaseService });
    this.container.set({ id: TODO_SERVICE_TOKEN, type: TodoService });
  }
  async init() {
    await this.warmup([TodoService]);
  }
}