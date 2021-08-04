import { Document as TDocument } from "../api/document/Document";

export const DOCUMENT_TITLE_FIELD = "id";

export const DocumentTitle = (record: TDocument) => {
  return record.id;
};
