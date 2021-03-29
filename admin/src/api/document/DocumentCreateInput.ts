import { ListboxWhereUniqueInput } from "../listbox/ListboxWhereUniqueInput";

export type DocumentCreateInput = {
  from?: Date | null;
  to?: Date | null;
  type?: ListboxWhereUniqueInput | null;
};
