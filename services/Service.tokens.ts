import {
    Token,
    ContainerInstance
} from '@bluelibs/core';

import { TodoService } from './Todo.service';

export const CONTAINER_TOKEN = new Token<ContainerInstance>();
export const TODO_SERVICE_TOKEN = new Token<TodoService>();