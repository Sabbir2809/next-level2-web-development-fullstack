import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create specialty
    createSpecialty: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [tagTypes.specialties],
    }),

    // get all specialties
    GetAllSpecialties: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: [tagTypes.specialties],
    }),

    // delete specialty
    deleteSpecialty: build.mutation({
      query: (id: string) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
  }),
});

export const { useCreateSpecialtyMutation, useGetAllSpecialtiesQuery, useDeleteSpecialtyMutation } =
  specialtiesApi;
