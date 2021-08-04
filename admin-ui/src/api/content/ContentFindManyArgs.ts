import { ContentWhereInput } from "./ContentWhereInput";
import { ContentOrderByInput } from "./ContentOrderByInput";

export type ContentFindManyArgs = {
  where?: ContentWhereInput;
  orderBy?: ContentOrderByInput;
  skip?: number;
  take?: number;
};
