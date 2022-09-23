import { Todo, TodoInput } from "../schema/todo";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Todos from "../models/todos";

@Resolver(() => Todo)
export class TodoResolver {
  @Query(() => [Todo], { nullable: true })
  async getTodos() {
    return await Todos.find({});
  }

  @Mutation(() => Todo)
  async addTodo(@Arg("todoInput") { ...TodoInput }: TodoInput) {
    let todo = new Todos({
      ...TodoInput,
      status: false,
    });
    return await todo.save();
  }
}
