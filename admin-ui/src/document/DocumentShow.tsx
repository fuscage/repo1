import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import { LISTBOX_TITLE_FIELD } from "../listbox/ListboxTitle";

export const DocumentShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="from" source="from" />
        <TextField label="ID" source="id" />
        <TextField label="to" source="to" />
        <ReferenceField label="Type" source="listbox.id" reference="Listbox">
          <TextField source={LISTBOX_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
