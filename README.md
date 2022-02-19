# bluelibs-foundation-todos

This application provides making CRUD operations on MongoDB with the power of Bluelibs and GraphQL.
###### (CRUD -> Create, Read, Update, Delete)

via GraphQL:

Playground link: *http://localhost:4000/graphql/api*

via HTTP Request:

POST *http://localhost:5000/auth/register* -> Create new user with security service.

POST *http://localhost:5000/auth/login* -> Authenticate user with security service.

POST *http://localhost:5000/auth/logout* -> Remove authenticated session with security service.

GET *http://localhost:5000/todo/:id* -> Fetch todo by id.

GET *http://localhost:5000/todo?page=2&count=3* -> Fetch todos.

POST *http://localhost:5000/todo* -> Create new Todo.

PUT *http://localhost:5000/todo/:id* -> Update todo with req.params.id and req.body

DELETE *http://localhost:5000/todo/:id* -> Delete Todo.

__*Note:*__

If you using Docker you can quickly create MongoDB Database with following docker commands:

First pull official mongodb image:

`docker pull mongo`

Run docker container:

-d -> Run container in detached(background) mode

-p -> Publish container's port on port 27017 in host.

`docker run -d -p 27017:27017 mongo`

after that just enter your local connection string inside of MongoBundle like below:

```
...
new MongoBundle({
  uri: "mongodb://localhost:27017/test",
  ...
}),
...
```
