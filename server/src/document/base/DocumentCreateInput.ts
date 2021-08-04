import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ListboxWhereUniqueInput } from "../../listbox/base/ListboxWhereUniqueInput";
@InputType()
class DocumentCreateInput {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  from?: Date | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  to?: Date | null;

  @ApiProperty({
    required: false,
    type: () => ListboxWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ListboxWhereUniqueInput)
  @IsOptional()
  @Field(() => ListboxWhereUniqueInput, {
    nullable: true,
  })
  type?: ListboxWhereUniqueInput | null;
}
export { DocumentCreateInput };
