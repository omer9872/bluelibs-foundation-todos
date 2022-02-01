import {
  Bundle,
} from '@bluelibs/core';
import { DatabaseService, DB_SERVICE_TOKEN } from '../services/Database.service';
import { TodoService, TODO_SERVICE_TOKEN } from '../services/Todo.service';

export class AppBundle extends Bundle {
  async prepare() {
    this.container.set({ id: DB_SERVICE_TOKEN, type: DatabaseService });
    this.container.set({ id: TODO_SERVICE_TOKEN, type: TodoService });
  }
  async init() {
    await this.warmup([TodoService]);
  }
}