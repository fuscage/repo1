import { ArgsType, Field } from "@nestjs/graphql";
import { ListboxWhereUniqueInput } from "./ListboxWhereUniqueInput";

@ArgsType()
class DeleteListboxArgs {
  @Field(() => ListboxWhereUniqueInput, { nullable: false })
  where!: ListboxWhereUniqueInput;
}

export { DeleteListboxArgs };
