import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type ListboxWhereInput = {
  code?: StringFilter;
  id?: StringFilter;
  label?: StringNullableFilter;
};
