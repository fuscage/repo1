import { DocumentWhereInput } from "./DocumentWhereInput";
import { DocumentOrderByInput } from "./DocumentOrderByInput";

export type DocumentFindManyArgs = {
  where?: DocumentWhereInput;
  orderBy?: DocumentOrderByInput;
  skip?: number;
  take?: number;
};
