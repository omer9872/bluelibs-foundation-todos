import {
  Service,
  Inject,
  Token
} from '@bluelibs/core';
import { DatabaseService } from './Database.service';
import { Todo } from '../models/Todo';
import { QueryResult } from 'pg';

export const TODO_SERVICE_TOKEN = new Token<TodoService>();

@Service()
export class TodoService {

  private databaseService: DatabaseService;

  constructor(@Inject(() => DatabaseService) databaseService: DatabaseService) {
    this.databaseService = databaseService;
    console.log("TodoService - Todo service is initialized")
  }

  insertTodo(newTodo: Todo) {
    return new Promise((resolve, reject) => {
      try {
        this.databaseService.getPoolClient().query("INSERT INTO todos(title) VALUES($1)", [newTodo.getTitle()])
          .then((result: QueryResult) => {
            console.log(result);
            return resolve(true);
          })
          .catch((err: any) => {
            return reject(err)
          })
      } catch (err: any) {
        return reject(err)
      }
    })
  }

}