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
import { Listbox } from "../api/listbox/Listbox";
import { ListboxCreateInput } from "../api/listbox/ListboxCreateInput";

const INITIAL_VALUES = {} as ListboxCreateInput;

export const CreateListbox = (): React.ReactElement => {
  useBreadcrumbs("/listboxes/new", "Create Listbox");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Listbox,
    AxiosError,
    ListboxCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/listboxes", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/listboxes"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ListboxCreateInput) => {
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
            <FormHeader title={"Create Listbox"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
