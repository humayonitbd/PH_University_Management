import { TQueryParams, TResponseRedux } from "../../../../types";
import { TCourse, TSemisterRegistration } from "../../../../types/coursesManagement";
import { baseApi } from "../../../api/baseApi";

const CourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemestersRegistration: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/semister-registrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semisterRegister"],
      transformResponse: (
        response: TResponseRedux<TSemisterRegistration[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addSemisterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semister-registrations/create-semister-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semisterRegister"],
    }),
    updateSemisterRegistrationStatus: builder.mutation({
      query: (args) => ({
        url: `semister-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semisterRegister"],
    }),

    // course api start
    getAllCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["course"],
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),

    assintFacultyCourse: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.id}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
    }),
    //offered Course
    addOfferedCours: builder.mutation({
      query: (data) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
    }),

    getAllOfferCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["course"],
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    
  }),
});



export const {
  useAddSemisterRegistrationMutation, 
  useGetAllSemestersRegistrationQuery, useUpdateSemisterRegistrationStatusMutation,
  useGetAllCourseQuery, useAddCourseMutation, useAssintFacultyCourseMutation,
  useAddOfferedCoursMutation, useGetAllOfferCourseQuery
} = CourseManagementApi;