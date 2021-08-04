import { Listbox as TListbox } from "../api/listbox/Listbox";

export const LISTBOX_TITLE_FIELD = "code";

export const ListboxTitle = (record: TListbox) => {
  return record.code;
};
