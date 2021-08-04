import { SortOrder } from "../../util/SortOrder";

export type DocumentOrderByInput = {
  createdAt?: SortOrder;
  from?: SortOrder;
  id?: SortOrder;
  to?: SortOrder;
  typeId?: SortOrder;
  updatedAt?: SortOrder;
};
