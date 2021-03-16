import { DocumentWhereUniqueInput } from "../document/DocumentWhereUniqueInput";

export type ListboxCreateInput = {
  code: string;
  documentListbox?: DocumentWhereUniqueInput;
  label?: string | null;
};
