import { TQueryParam, TResponseRedux, TSemesterRegistration } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (params) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/semester-registration",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TSemesterRegistration[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddRegisteredSemesterMutation, useGetAllRegisteredSemestersQuery } = courseManagementApi;
