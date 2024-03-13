import { TQueryParam, TResponseRedux } from "../../../types/global.type";
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
      query: (args) => {
        const params = new URLSearchParams();

        if (params) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
      transformResponse: (response: TResponseRedux<any>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    verifyProduct: builder.query({
      query: (productID) => {
        return {
          url: `/products/verify/${productID}`,
          method: "GET",
        };
      },
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

    deleteMultipleProducts: builder.mutation({
      query: (productIds) => {
        return {
          url: `/products`,
          method: "DELETE",
          body: productIds,
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

    addToCart: builder.mutation({
      query: (cartData) => ({
        url: "/products/add-to-cart",
        method: "PUT",
        body: cartData,
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetDashboardStatisticsQuery,
  useGetProductsQuery,
  useVerifyProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useDeleteMultipleProductsMutation,
  useUpdateProductMutation,
  useAddToCartMutation,
} = productApi;
