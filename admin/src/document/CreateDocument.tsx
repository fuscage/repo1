import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ListboxSelect } from "../listbox/ListboxSelect";
import { Document } from "../api/document/Document";
import { DocumentCreateInput } from "../api/document/DocumentCreateInput";

const INITIAL_VALUES = {} as DocumentCreateInput;

export const CreateDocument = (): React.ReactElement => {
  useBreadcrumbs("/documents/new", "Create Document");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Document,
    AxiosError,
    DocumentCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/documents", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/documents"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: DocumentCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Document"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField type="datetime-local" label="from" name="from" />
          </div>
          <div>
            <TextField type="datetime-local" label="to" name="to" />
          </div>
          <div>
            <ListboxSelect label="Type" name="type.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
