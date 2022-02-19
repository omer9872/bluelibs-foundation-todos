import {
  Bundle,
} from '@bluelibs/core';
import { TodoService, } from '../services/Todo.service';
import { Loader } from "@bluelibs/graphql-bundle";

import { TODO_SERVICE_TOKEN } from '../services/Service.tokens';
import { Todo } from '../models/Todo';
import { ObjectID } from '@bluelibs/mongo-bundle';

export class AppBundle extends Bundle {
  async prepare() {
    this.container.set({ id: TODO_SERVICE_TOKEN, type: TodoService });
  }
  async init() {
    await this.warmup([TodoService]);

    const loader = this.container.get(Loader);
    const todoService: TodoService = this.container.get(TodoService);

    loader.load({
      typeDefs: `
        type Todo {
          _id:String!
          title: String!
          status: String!
          createDate: String!
        }

        type Query {
          getTodo(id:String!): Todo
          getTodos(page:Int!, count:Int!): [Todo]
        }

        type Mutation {
          createTodo(title:String!): Todo!
          updateTodo(id:String!, title:String!, status:String!): Todo!
          deleteTodo(id:String!): Boolean!
        }
      `,

      resolvers: {
        Query: {
          getTodo: async (parent: any, args: any, context: any, info: any) => {
            if (args.id) {
              let todo: Todo = new Todo();
              todo.setID(new ObjectID(args.id));
              return await todoService.getTodo(todo);;
            } else {
              return {};
            }
          },
          getTodos: async (parent: any, args: any, context: any, info: any) => {
            if (args.page && args.count) {
              return await todoService.getTodos(args.page, args.count);
            } else {
              return [];
            }
          },
        },
        Mutation: {
          createTodo: async (parent: any, args: any, context: any, info: any) => {
            if (args.title) {
              let todo: Todo = new Todo();
              todo.setTitle(args.title);
              await todoService.insertTodo(todo);
              return todo.asJSON();
            } else {
              return {}
            }
          },
          updateTodo: async (parent: any, args: any, context: any, info: any) => {
            if (args.id && args.title && args.status) {
              let todo: Todo = new Todo(new ObjectID(args.id), args.title, args.status);
              await todoService.updateTodo(todo);
              return todo.asJSON();
            } else {
              return {}
            }
          },
          deleteTodo: async (parent: any, args: any, context: any, info: any) => {
            if (args.id) {
              let todo: Todo = new Todo(new ObjectID(args.id));
              await todoService.deleteTodo(todo);
              return true
            } else {
              return false
            }
          },
        }
      },

    });
  }
}