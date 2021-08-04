import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DocumentWhereInput } from "./DocumentWhereInput";
import { Type } from "class-transformer";
import { DocumentOrderByInput } from "./DocumentOrderByInput";

@ArgsType()
class DocumentFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => DocumentWhereInput,
  })
  @Field(() => DocumentWhereInput, { nullable: true })
  @Type(() => DocumentWhereInput)
  where?: DocumentWhereInput;

  @ApiProperty({
    required: false,
    type: DocumentOrderByInput,
  })
  @Field(() => DocumentOrderByInput, { nullable: true })
  @Type(() => DocumentOrderByInput)
  orderBy?: DocumentOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { DocumentFindManyArgs };
