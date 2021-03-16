import { ListboxWhereUniqueInput } from "../listbox/ListboxWhereUniqueInput";

export type DocumentWhereInput = {
  createdAt?: Date;
  from?: Date | null;
  id?: string;
  to?: Date | null;
  type?: ListboxWhereUniqueInput | null;
  updatedAt?: Date;
};
