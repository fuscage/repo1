import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested, IsOptional } from "class-validator";
import { DocumentWhereUniqueInput } from "../../document/base/DocumentWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class ListboxCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  code!: string;
  @ApiProperty({
    required: false,
    type: DocumentWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DocumentWhereUniqueInput)
  @IsOptional()
  @Field(() => DocumentWhereUniqueInput, {
    nullable: true,
  })
  documentListbox?: DocumentWhereUniqueInput;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  label?: string | null;
}
export { ListboxCreateInput };
