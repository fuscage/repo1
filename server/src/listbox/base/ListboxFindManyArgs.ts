import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ListboxWhereInput } from "./ListboxWhereInput";
import { Type } from "class-transformer";
import { ListboxOrderByInput } from "./ListboxOrderByInput";

@ArgsType()
class ListboxFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ListboxWhereInput,
  })
  @Field(() => ListboxWhereInput, { nullable: true })
  @Type(() => ListboxWhereInput)
  where?: ListboxWhereInput;

  @ApiProperty({
    required: false,
    type: ListboxOrderByInput,
  })
  @Field(() => ListboxOrderByInput, { nullable: true })
  @Type(() => ListboxOrderByInput)
  orderBy?: ListboxOrderByInput;

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

export { ListboxFindManyArgs };
