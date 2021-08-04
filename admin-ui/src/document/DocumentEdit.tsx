import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { ListboxTitle } from "../listbox/ListboxTitle";

export const DocumentEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <DateTimeInput label="from" source="from" />
        <DateTimeInput label="to" source="to" />
        <ReferenceInput source="listbox.id" reference="Listbox" label="Type">
          <SelectInput optionText={ListboxTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
