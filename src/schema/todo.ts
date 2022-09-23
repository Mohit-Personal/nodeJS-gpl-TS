import { Field, InputType, ObjectType} from "type-graphql";

@ObjectType()
export class Todo {
    @Field()
    id: string

    @Field()
    title: string

    @Field()
    description: string

    @Field()
    status: boolean
}

@InputType()
export class TodoInput implements Partial<Todo>{
    @Field()
    title: string

    @Field()
    description: string
}