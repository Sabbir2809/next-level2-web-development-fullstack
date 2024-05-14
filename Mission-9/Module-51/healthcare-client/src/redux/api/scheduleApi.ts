import { TMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create schedule
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.schedule],
    }),

    // get all schedule
    getAllSchedules: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/schedule",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: [], meta: TMeta) => {
        return {
          schedules: response,
          meta: meta,
        };
      },
      providesTags: [tagTypes.schedule],
    }),

    // delete schedule
    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const { useCreateScheduleMutation, useGetAllSchedulesQuery, useDeleteScheduleMutation } =
  scheduleApi;
