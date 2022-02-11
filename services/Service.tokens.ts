import {
    Token,
    ContainerInstance
} from '@bluelibs/core';

import { TodoService } from './Todo.service';
import { DatabaseService } from './Database.service';

export const CONTAINER_TOKEN = new Token<ContainerInstance>();
export const TODO_SERVICE_TOKEN = new Token<TodoService>();
export const DB_SERVICE_TOKEN = new Token<DatabaseService>();