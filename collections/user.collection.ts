import { Collection } from "@bluelibs/mongo-bundle";
import { Todo } from "../models/Todo";

export class UsersCollection extends Collection<Todo> {
    static collectionName = "todos";
}