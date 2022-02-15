import {
  Bundle,
} from '@bluelibs/core';
import { TodoService, } from '../services/Todo.service';

import { TODO_SERVICE_TOKEN } from '../services/Service.tokens';

export class AppBundle extends Bundle {
  async prepare() {
    this.container.set({ id: TODO_SERVICE_TOKEN, type: TodoService });
  }
  async init() {
    await this.warmup([TodoService]);
  }
}