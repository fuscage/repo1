import { ArgsType, Field } from "@nestjs/graphql";
import { ListboxWhereUniqueInput } from "./ListboxWhereUniqueInput";
import { ListboxUpdateInput } from "./ListboxUpdateInput";

@ArgsType()
class UpdateListboxArgs {
  @Field(() => ListboxWhereUniqueInput, { nullable: false })
  where!: ListboxWhereUniqueInput;
  @Field(() => ListboxUpdateInput, { nullable: false })
  data!: ListboxUpdateInput;
}

export { UpdateListboxArgs };
