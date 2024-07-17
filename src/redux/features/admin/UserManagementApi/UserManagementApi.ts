import { TQueryParams, TResponseRedux } from "../../../../types";
import { TStudent } from "../../../../types/userManagement.type";
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
      query: ({id, data}) => ({
        url: `students/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getSingleStudent: builder.query({
      query: (id) => ({
        url: `students/${id}`,
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
  }),
});



export const {useAddStudentMutation, useGetAllStudentsQuery, useGetSingleStudentQuery, useUpdateStudentMutation} = UserManagementApi;