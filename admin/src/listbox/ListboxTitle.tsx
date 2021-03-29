import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Listbox } from "../api/listbox/Listbox";

type Props = { id: string };

export const ListboxTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Listbox,
    AxiosError,
    [string, string]
  >(["get-/api/listboxes", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/listboxes"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/listboxes"}/${id}`} className="entity-id">
      {data?.code && data?.code.length ? data.code : data?.id}
    </Link>
  );
};
