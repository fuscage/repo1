import { ArgsType, Field } from "@nestjs/graphql";
import { ContentWhereUniqueInput } from "./ContentWhereUniqueInput";

@ArgsType()
class FindOneContentArgs {
  @Field(() => ContentWhereUniqueInput, { nullable: false })
  where!: ContentWhereUniqueInput;
}

export { FindOneContentArgs };
