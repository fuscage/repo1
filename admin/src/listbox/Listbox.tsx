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
import { Listbox as TListbox } from "../api/listbox/Listbox";
import { ListboxUpdateInput } from "../api/listbox/ListboxUpdateInput";

export const Listbox = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/listboxes/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TListbox,
    AxiosError,
    [string, string]
  >(["get-/api/listboxes", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/listboxes"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TListbox, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/listboxes"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//listboxes");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TListbox, AxiosError, ListboxUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/listboxes"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ListboxUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.code);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(() => pick(data, ["code", "label"]), [
    data,
  ]);

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
                title={`${"Listbox"} ${
                  data?.code && data?.code.length ? data.code : data?.id
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
              <TextField label="code" name="code" />
            </div>
            <div>
              <TextField label="label" name="label" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
