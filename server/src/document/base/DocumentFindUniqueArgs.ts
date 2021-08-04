import { ArgsType, Field } from "@nestjs/graphql";
import { DocumentWhereUniqueInput } from "./DocumentWhereUniqueInput";

@ArgsType()
class DocumentFindUniqueArgs {
  @Field(() => DocumentWhereUniqueInput, { nullable: false })
  where!: DocumentWhereUniqueInput;
}

export { DocumentFindUniqueArgs };
