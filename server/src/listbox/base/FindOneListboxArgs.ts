import { ArgsType, Field } from "@nestjs/graphql";
import { ListboxWhereUniqueInput } from "./ListboxWhereUniqueInput";

@ArgsType()
class FindOneListboxArgs {
  @Field(() => ListboxWhereUniqueInput, { nullable: false })
  where!: ListboxWhereUniqueInput;
}

export { FindOneListboxArgs };
