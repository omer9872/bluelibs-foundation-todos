import { HTTPBundle, RouteType } from '@bluelibs/http-bundle';
import { Todo } from '../models/Todo';

import { TodoService, TODO_SERVICE_TOKEN } from '../services/Todo.service';
import { AppBundle } from '../bundles/App.bundle';

export const todoRoute = new HTTPBundle({ port: 5000 });
const routes: Array<RouteType> = [
  {
    type: "get",
    path: "/todo",
    async handler(container, req, res, next) {
      const todoService: TodoService = container.get(AppBundle).get(TODO_SERVICE_TOKEN);
      todoService.getTodos()
        .then((result) => {
          res.status(200).json({ todos: result });
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        })
    },
  },
  {
    type: "get",
    path: "/todo/:id",
    async handler(container, req, res, next) {
      const todoService: TodoService = container.get(AppBundle).get(TODO_SERVICE_TOKEN);
      todoService.getTodo(new Todo(parseInt(req.params.id)))
        .then((result) => {
          res.status(200).json({ todo: result });
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        })
    },
  },
  {
    type: "post",
    path: "/todo/",
    async handler(container, req, res, next) {
      const todoService: TodoService = container.get(AppBundle).get(TODO_SERVICE_TOKEN);
      todoService.insertTodo(new Todo().fromJSON(req.body))
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        })
    },
  },
  {
    type: "put",
    path: "/todo/:id",
    async handler(container, req, res, next) {
      const todoService: TodoService = container.get(AppBundle).get(TODO_SERVICE_TOKEN);
      const todo = new Todo().fromJSON(req.body);
      todo.setID(parseInt(req.params.id));
      todoService.updateTodo(todo)
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        })
    },
  },
  {
    type: "delete",
    path: "/todo/:id",
    async handler(container, req, res, next) {
      const todoService: TodoService = container.get(AppBundle).get(TODO_SERVICE_TOKEN);
      todoService.deleteTodo(new Todo(parseInt(req.params.id)))
        .then((result) => {
          res.sendStatus(204);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        })
    },
  },
];


todoRoute.addRoutes(routes);