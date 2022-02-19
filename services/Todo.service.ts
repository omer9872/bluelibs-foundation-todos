import {
  Service,
  Inject
} from '@bluelibs/core';
import { Todo } from '../models/Todo';
import { TodosCollection } from '../collections/todo.collection';

@Service()
export class TodoService {

  @Inject(() => TodosCollection)
  private todosCollection?: TodosCollection;

  constructor() {
    console.log("TodoService - TodoService service is initi1alized...")
  }

  insertTodo(newTodo: Todo) {
    return new Promise(async (resolve, reject): Promise<any> => {
      try {
        let insertResult = await this.todosCollection?.insertOne(newTodo.asJSON());
        if (insertResult?.acknowledged) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      } catch (err: any) {
        return reject(err)
      }
    })
  }

  getTodo(todo: Todo) {
    return new Promise(async (resolve, reject): Promise<any> => {
      try {
        let cursor = await this.todosCollection?.find({ _id: todo.getID() });
        if (cursor) {
          const todos: Array<any> = await cursor.toArray();
          return resolve(todos[0]);
        }
      } catch (err: any) {
        return reject(err)
      }
    })
  }

  getTodos(page: number, count: number): Promise<Array<any>> {
    return new Promise(async (resolve, reject): Promise<any> => {
      try {
        let cursor = await this.todosCollection?.find({}, { limit: page * count });
        if (cursor) {
          let todos = await cursor.toArray();
          if (todos.slice((page - 1) * count).length > 0) {
            return resolve(todos.slice((page - 1) * count));
          } else {
            return resolve([]);
          }
        } else {
          return resolve([]);
        }
      } catch (err: any) {
        return reject(err)
      }
    })
  }

  updateTodo(todo: Todo) {
    return new Promise(async (resolve, reject): Promise<any> => {
      try {
        let result = await this.todosCollection?.findOneAndUpdate({ _id: todo.getID() }, { $set: { title: todo.getTitle(), status: todo.getStatus() } });
        console.log(result);
        return resolve(true);
      } catch (err: any) {
        return reject(err)
      }
    })
  }

  deleteTodo(todo: Todo) {
    return new Promise(async (resolve, reject): Promise<any> => {
      try {
        let result = await this.todosCollection?.findOneAndDelete({ _id: todo.getID() });
        return resolve(true);
      } catch (err: any) {
        return reject(err)
      }
    })
  }

}