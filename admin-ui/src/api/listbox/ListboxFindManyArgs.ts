import { ListboxWhereInput } from "./ListboxWhereInput";
import { ListboxOrderByInput } from "./ListboxOrderByInput";

export type ListboxFindManyArgs = {
  where?: ListboxWhereInput;
  orderBy?: ListboxOrderByInput;
  skip?: number;
  take?: number;
};
