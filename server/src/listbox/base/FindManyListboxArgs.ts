import { ArgsType, Field } from "@nestjs/graphql";
import { ListboxWhereInput } from "./ListboxWhereInput";

@ArgsType()
class FindManyListboxArgs {
  @Field(() => ListboxWhereInput, { nullable: true })
  where?: ListboxWhereInput;
}

export { FindManyListboxArgs };
