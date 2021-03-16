import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Listbox } from "../api/listbox/Listbox";

type Data = Listbox[];

type Props = Omit<SelectFieldProps, "options">;

export const ListboxSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/listboxes",
    async () => {
      const response = await api.get("/api/listboxes");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.code && item.code.length ? item.code : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
