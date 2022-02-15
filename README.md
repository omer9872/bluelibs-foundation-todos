# bluelibs-foundation-todos

This application provides making CRUD operations on Todo model with the power of Bluelibs.
###### (CRUD -> Create, Read, Update, Delete)

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
