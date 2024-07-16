import { baseApi } from "../../../api/baseApi";

const UserManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllStudents: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item: TQueryParams) =>
    //         params.append(item.name, item.value as string)
    //       );
    //     }

    //     return {
    //       url: "/academic-semisters",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<TAcademicSemister[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body:data
      }),
    }),
  }),
});



export const {useAddStudentMutation} = UserManagementApi;