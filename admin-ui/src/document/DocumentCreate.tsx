import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { ListboxTitle } from "../listbox/ListboxTitle";

export const DocumentCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <DateTimeInput label="from" source="from" />
        <DateTimeInput label="to" source="to" />
        <ReferenceInput source="listbox.id" reference="Listbox" label="Type">
          <SelectInput optionText={ListboxTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
