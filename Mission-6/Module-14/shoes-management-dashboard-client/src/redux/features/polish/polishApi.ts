import { baseApi } from "../../api/baseApi";

const polishApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPolishRequest: builder.mutation({
      query: (data) => ({
        url: `/polish/create-polish-request`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["polish"],
    }),

    getAllPolishRequest: builder.query({
      query: () => ({
        url: `/polish/all-polish-requests`,
        method: "GET",
      }),
      providesTags: ["polish"],
    }),

    updatePolishRequestStatus: builder.mutation({
      query: (options) => ({
        url: `/polish/polish-request-status/${options.polishId}`,
        method: "PUT",
        body: options.data,
      }),
      invalidatesTags: ["polish"],
    }),
  }),
});

export const {
  useCreatePolishRequestMutation,
  useGetAllPolishRequestQuery,
  useUpdatePolishRequestStatusMutation,
} = polishApi;
