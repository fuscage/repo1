import { ListboxWhereUniqueInput } from "../listbox/ListboxWhereUniqueInput";

export type Document = {
  createdAt: Date;
  from: Date | null;
  id: string;
  to: Date | null;
  type: ListboxWhereUniqueInput;
  updatedAt: Date;
};
