import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMark: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/update-enrolled-course-marks",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
    getAllFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (params) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<any>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
  }),
});

export const { useGetAllFacultyCoursesQuery, useAddMarkMutation } = facultyCourseManagementApi;
