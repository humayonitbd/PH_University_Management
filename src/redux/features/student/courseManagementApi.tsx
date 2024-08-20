import { TQueryParams, TResponseRedux } from "../../../types";
import { TMyOfferCourse } from "../../../types/student.courseManagement";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyOfferCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["enrolledCourse"],
      transformResponse: (response: TResponseRedux<TMyOfferCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    enroledCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["enrolledCourse"],
    }),

    getAllMyEnrolledCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/enrolled-courses/myenrolled-courses",
          method: "GET",
          params: params,
        };
      },
     
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data:  response?.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {useGetAllMyOfferCourseQuery, useEnroledCourseMutation, useGetAllMyEnrolledCourseQuery} = courseManagementApi;