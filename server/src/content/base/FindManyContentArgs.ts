import { ArgsType, Field } from "@nestjs/graphql";
import { ContentWhereInput } from "./ContentWhereInput";

@ArgsType()
class FindManyContentArgs {
  @Field(() => ContentWhereInput, { nullable: true })
  where?: ContentWhereInput;
}

export { FindManyContentArgs };
