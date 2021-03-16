import { DocumentWhereUniqueInput } from "../document/DocumentWhereUniqueInput";

export type ListboxUpdateInput = {
  code?: string;
  documentListbox?: DocumentWhereUniqueInput;
  label?: string | null;
};
