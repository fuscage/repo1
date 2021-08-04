import { Content as TContent } from "../api/content/Content";

export const CONTENT_TITLE_FIELD = "name";

export const ContentTitle = (record: TContent) => {
  return record.name;
};
