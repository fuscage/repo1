import { ArgsType, Field } from "@nestjs/graphql";
import { ListboxWhereUniqueInput } from "./ListboxWhereUniqueInput";

@ArgsType()
class ListboxFindUniqueArgs {
  @Field(() => ListboxWhereUniqueInput, { nullable: false })
  where!: ListboxWhereUniqueInput;
}

export { ListboxFindUniqueArgs };
