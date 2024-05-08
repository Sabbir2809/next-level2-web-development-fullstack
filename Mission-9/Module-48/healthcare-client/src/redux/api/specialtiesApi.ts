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
    }),

    // get all specialties
    GetAllSpecialties: build.query({
      query: () => ({
        url: "/specialties",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateSpecialtyMutation, useGetAllSpecialtiesQuery } = specialtiesApi;
