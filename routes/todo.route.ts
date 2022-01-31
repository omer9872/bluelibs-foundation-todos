import { HTTPBundle, RouteType } from '@bluelibs/http-bundle';
import { Todo } from '../models/Todo';

import { TodoService, TODO_SERVICE_TOKEN } from '../services/Todo.service';
import { APP_BUNDLE_SERVICE_TOKEN } from '..';

export const todoRoute = new HTTPBundle({ port: 5000 });
const routes: Array<RouteType> = [
  {
    type: "get",
    path: "/todo",
    async handler(container, req, res, next) {
      console.log("get all todos...");
      console.log(container);
      res.sendStatus(200);
    },
  },
  {
    type: "get",
    path: "/todo/:id",
    async handler(container, req, res, next) {
      console.log(`get all todo with id: ${req.params.id}`);
      res.sendStatus(200);
    },
  },
  {
    type: "post",
    path: "/todo/",
    async handler(container, req, res, next) {
      //const todoService: TodoService = container.get(TODO_SERVICE_TOKEN);
      console.log(container);
      res.sendStatus(200);
      /*todoService.insertTodo(new Todo().fromJSON(req.body))
        .then((result) => {
          console.log(result)
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        })*/
    },
  },
  {
    type: "put",
    path: "/todo/:id",
    async handler(container, req, res, next) {
      console.log(`update todo with id: ${req.params.id}`);
      res.sendStatus(200);
    },
  },
  {
    type: "delete",
    path: "/todo/:id",
    async handler(container, req, res, next) {
      console.log(`delete todo with id: ${req.params.id}`);
      res.sendStatus(204);
    },
  },
];


todoRoute.addRoutes(routes);