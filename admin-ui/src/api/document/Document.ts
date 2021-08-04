import { Listbox } from "../listbox/Listbox";

export type Document = {
  createdAt: Date;
  from: Date | null;
  id: string;
  to: Date | null;
  type?: Listbox | null;
  updatedAt: Date;
};
