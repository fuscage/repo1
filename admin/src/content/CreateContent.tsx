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
import { Content } from "../api/content/Content";
import { ContentCreateInput } from "../api/content/ContentCreateInput";

const INITIAL_VALUES = {} as ContentCreateInput;

export const CreateContent = (): React.ReactElement => {
  useBreadcrumbs("/contents/new", "Create Content");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Content,
    AxiosError,
    ContentCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/contents", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/contents"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ContentCreateInput) => {
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
            <FormHeader title={"Create Content"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
