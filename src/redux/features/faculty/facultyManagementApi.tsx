import { TQueryParams, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const FacultyManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacultyEnrolledCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/enrolled-courses/enrolled-faculty",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    facultyAddMarkCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/update-enrolled-course-marks",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllFacultyEnrolledCourseQuery,
  useFacultyAddMarkCourseMutation, 
} = FacultyManagementApi;
