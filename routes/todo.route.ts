import { HTTPBundle, RouteType } from '@bluelibs/http-bundle';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/Todo.service';
import { AppBundle } from '../bundles/App.bundle';
import { TODO_SERVICE_TOKEN } from '../services/Service.tokens';
import { ObjectID } from '@bluelibs/mongo-bundle';

export const todoRoutes: Array<RouteType> = [
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
      todoService.getTodo(new Todo(new ObjectID(req.params.id)))
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
          if (result) {
            res.sendStatus(200);
          } else {
            res.sendStatus(500);
          }
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
      todo.setID(new ObjectID(req.params.id));
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
      todoService.deleteTodo(new Todo(new ObjectID(req.params.id)))
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