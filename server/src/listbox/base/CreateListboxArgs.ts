import { ArgsType, Field } from "@nestjs/graphql";
import { ListboxCreateInput } from "./ListboxCreateInput";

@ArgsType()
class CreateListboxArgs {
  @Field(() => ListboxCreateInput, { nullable: false })
  data!: ListboxCreateInput;
}

export { CreateListboxArgs };
