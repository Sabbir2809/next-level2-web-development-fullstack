import { TEnrolledCourse, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const studentCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (params) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<TEnrolledCourse[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    getAllEnrollCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (params) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/enrolled-courses/my-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<TEnrolledCourse[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
  }),
});

export const { useGetAllOfferedCoursesQuery, useEnrollCourseMutation, useGetAllEnrollCoursesQuery } =
  studentCourseManagementApi;
