import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initialPayment: build.mutation({
      query: (id: string) => ({
        url: `/payment/init-payment/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const { useInitialPaymentMutation } = paymentApi;
