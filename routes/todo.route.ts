import { HTTPBundle, RouteType } from '@bluelibs/http-bundle';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/Todo.service';
import { AppBundle } from '../bundles/App.bundle';
import { TODO_SERVICE_TOKEN } from '../services/Service.tokens';
import { ObjectID } from '@bluelibs/mongo-bundle';

interface IGetQuery {
  page?: string;
  count?: string;
}

export const todoRoutes: Array<RouteType> = [
  {
    type: "get",
    path: "/todo",
    async handler(container, req, res, next) {
      const queryParams: IGetQuery = req.query;
      if (queryParams.page && queryParams.count) {
        try {
          const page: number = parseInt(queryParams.page);
          const count: number = parseInt(queryParams.count);
          const todoService: TodoService = container.get(AppBundle).get(TODO_SERVICE_TOKEN);
          todoService.getTodos(page, count)
            .then((result) => {
              res.status(200).json({ page: page, count: count, itemCount: result.length, todos: result });
            })
            .catch((err) => {
              console.log(err);
              res.sendStatus(500);
            })

        } catch (err) {
          console.log(err);
          res.status(400).json({ message: 'invalid query parameters' });
        }
      } else {
        res.status(400).json({ message: 'invalid query parameters' });
      }
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