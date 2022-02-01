import {
  Service,
  Inject,
  Token,
  ContainerInstance
} from '@bluelibs/core';
import { DatabaseService, DB_SERVICE_TOKEN } from './Database.service';
import { Todo } from '../models/Todo';
import { QueryResult } from 'pg';

export const TODO_SERVICE_TOKEN = new Token<TodoService>();

@Service()
export class TodoService {

  private databaseService?: DatabaseService;

  constructor(@Inject(TODO_SERVICE_TOKEN) container: ContainerInstance) {
    this.databaseService = container.get(DB_SERVICE_TOKEN);
    console.log("TodoService - TodoService service is initi1alized...")
  }

  insertTodo(newTodo: Todo) {
    return new Promise((resolve, reject): any => {
      try {
        this.databaseService!.poolClient!.query("INSERT INTO todos(title) VALUES($1)", [newTodo.getTitle()])
          .then((result: QueryResult) => {
            if (result.rowCount === 1) {
              return resolve(true);
            } else {
              return reject(new Error("error occured while inserting new todo"))
            }
          })
          .catch((err: any) => {
            return reject(err)
          })
      } catch (err: any) {
        return reject(err)
      }
    })
  }

  getTodo(todo: Todo) {
    return new Promise((resolve, reject): any => {
      try {
        this.databaseService!.poolClient!.query("SELECT * FROM todos WHERE id=$1", [todo.getID()])
          .then((result: QueryResult) => {
            if (result.rowCount === 1) {
              return resolve(result.rows[0]);
            } else {
              return reject(new Error("error occured while selecting todo"))
            }
          })
          .catch((err: any) => {
            return reject(err)
          })
      } catch (err: any) {
        return reject(err)
      }
    })
  }

  getTodos() {
    return new Promise((resolve, reject): any => {
      try {
        this.databaseService!.poolClient!.query("SELECT * FROM todos")
          .then((result: QueryResult) => {
            return resolve(result.rows);
          })
          .catch((err: any) => {
            return reject(err)
          })
      } catch (err: any) {
        return reject(err)
      }
    })
  }

  updateTodo(todo: Todo) {
    return new Promise((resolve, reject): any => {
      try {
        this.databaseService!.poolClient!.query("UPDATE todos SET title=$1, status=$2 WHERE id=$3", [todo.getTitle(), todo.getStatus(), todo.getID()])
          .then((result: QueryResult) => {
            if (result.rowCount === 1) {
              return resolve(true);
            } else {
              return reject(new Error("error occured while updating todo"))
            }
          })
          .catch((err: any) => {
            return reject(err)
          })
      } catch (err: any) {
        return reject(err)
      }
    })
  }

  deleteTodo(todo: Todo) {
    return new Promise((resolve, reject): any => {
      try {
        this.databaseService!.poolClient!.query("DELETE FROM todos WHERE id=$1", [todo.getID()])
          .then((result: QueryResult) => {
            if (result.rowCount === 1) {
              return resolve(true);
            } else {
              return reject(new Error("error occured while deleting todo"))
            }
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