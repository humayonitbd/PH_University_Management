
import { TQueryParams, TResponseRedux } from "../../../../types";
import { TAcademicDepartment, TAcademicFaculty, TAcademicSemister } from "../../../../types/academicManagement.type";
import { baseApi } from "../../../api/baseApi";

const AcademicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/academic-semisters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemister[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemister: builder.mutation({
      query: (data) => ({
        url: "/academic-semisters/create-academic-semister",
        method: "POST",
        body: data,
      }),
    }),

    getAcademicFaculties: builder.query({
      query: () => {
        return { url: "/academic-faculties", method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicDepartments: builder.query({
      query: () => {
        return { url: "/academic-departments", method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});


export const {useGetAllSemestersQuery, useAddAcademicSemisterMutation, useGetAcademicFacultiesQuery, useAddAcademicFacultyMutation,useGetAcademicDepartmentsQuery,useAddAcademicDepartmentMutation} = AcademicManagementApi;