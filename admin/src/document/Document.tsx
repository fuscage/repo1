import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ListboxSelect } from "../listbox/ListboxSelect";
import { Document as TDocument } from "../api/document/Document";
import { DocumentUpdateInput } from "../api/document/DocumentUpdateInput";

export const Document = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/documents/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TDocument,
    AxiosError,
    [string, string]
  >(["get-/api/documents", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/documents"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TDocument, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/documents"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//documents");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TDocument, AxiosError, DocumentUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/documents"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: DocumentUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["from", "to", "type"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Document"} ${
                  data?.id && data?.id.length ? data.id : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
