import { TQueryParams, TResponseRedux } from "../../../../types";
import { TFaculty, TStudent } from "../../../../types/userManagement.type";
import { baseApi } from "../../../api/baseApi";

const UserManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateStudent: builder.mutation({
      query: ({ id, formData }) => {
        console.log("redux console", formData);
        return {
          url: `/students/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    getSingleStudent: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    // faculty api start
    getAllFacultys: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateFaculty: builder.mutation({
      query: ({ id, formData }) => {
        console.log("redux console", formData);
        return {
          url: `/faculties/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    getSingleFaculty: builder.query({
      query: (id) => ({
        url: `/faculties/${id}`,
        method: "GET",
      }),
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
    // admin api start
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateAdmin: builder.mutation({
      query: ({ id, formData }) => {
        // console.log("redux console", formData);
        return {
          url: `/admins/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    getSingleAdmin: builder.query({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "GET",
      }),
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
  }),
});



export const {
  useAddStudentMutation, 
  useGetAllStudentsQuery, 
  useGetSingleStudentQuery, 
  useUpdateStudentMutation, 
  useAddFacultyMutation, 
  useGetAllFacultysQuery,
  useGetSingleFacultyQuery,
  useUpdateFacultyMutation,
  useAddAdminMutation,
  useGetAllAdminsQuery,
  useGetSingleAdminQuery,
  useUpdateAdminMutation
} = UserManagementApi;