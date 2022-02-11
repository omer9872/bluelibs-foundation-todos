# bluelibs-foundation-todos

This application provides making CRUD operations on Todo model with the power of Bluelibs.
###### (CRUD -> Create, Read, Update, Delete)

__*Note:*__

If you using Docker you can quickly create PostgreSQL Database with following docker commands:

First pull postgress image:

`docker pull postgres`

Run docker container:

`docker run --name postgresql -e POSTGRES_PASSWORD=<YOUR_DB_PASSWORD> -d -p 5432:5432 postgres`

after that here are your Database configurations:

```
Host: 127.0.0.1(localhost)
Database Name: postgres(Default)
User Name: postgres(Default)
Database Port: 5432
Password: <YOUR_DB_PASSWORD>
```
