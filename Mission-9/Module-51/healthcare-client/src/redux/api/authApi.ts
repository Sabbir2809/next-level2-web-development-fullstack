import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `auth/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    changePassword: build.mutation({
      query: (updateData) => ({
        url: `/auth/change-password`,
        method: "POST",
        contentType: "application/json",
        data: updateData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    forgotPassword: build.mutation({
      query: (updateData) => ({
        url: `/auth/forget-password`,
        method: "POST",
        data: updateData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    resetPassword: build.mutation({
      query: (updateData) => ({
        url: `/auth/reset-password`,
        method: "POST",
        data: updateData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
