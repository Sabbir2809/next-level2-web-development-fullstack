import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatistics: builder.query({
      query: () => ({
        url: `/sales/stats`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products/create-product",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => {
        return {
          url: `/products/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: (options) => {
        return {
          url: `/products/${options?.productId}`,
          method: "PATCH",
          body: options.data,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetDashboardStatisticsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
