import { ContentWhereUniqueInput } from "./ContentWhereUniqueInput";
import { ContentUpdateInput } from "./ContentUpdateInput";

export type UpdateContentArgs = {
  where: ContentWhereUniqueInput;
  data: ContentUpdateInput;
};
