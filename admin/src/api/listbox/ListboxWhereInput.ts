import { DocumentWhereUniqueInput } from "../document/DocumentWhereUniqueInput";

export type ListboxWhereInput = {
  code?: string;
  createdAt?: Date;
  documentListbox?: DocumentWhereUniqueInput;
  id?: string;
  label?: string | null;
  updatedAt?: Date;
};
