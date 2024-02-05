import { baseApi } from "../../api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesHistory: builder.query({
      query: (salesPeriod) => ({
        url: `/sales/${salesPeriod}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    createSale: builder.mutation({
      query: (data) => ({
        url: `/sales/create-sell`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const { useGetSalesHistoryQuery, useCreateSaleMutation } = saleApi;
