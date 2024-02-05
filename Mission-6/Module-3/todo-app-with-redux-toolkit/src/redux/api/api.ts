import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/todos",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTodosQuery } = baseApi;
