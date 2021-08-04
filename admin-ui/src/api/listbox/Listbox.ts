import { Document } from "../document/Document";

export type Listbox = {
  code: string;
  createdAt: Date;
  documentListbox?: Array<Document>;
  id: string;
  label: string | null;
  updatedAt: Date;
};
