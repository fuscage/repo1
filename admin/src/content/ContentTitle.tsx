import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Content } from "../api/content/Content";

type Props = { id: string };

export const ContentTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Content,
    AxiosError,
    [string, string]
  >(["get-/api/contents", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/contents"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/contents"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
