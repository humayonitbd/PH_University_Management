


import { z } from "zod";
export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Academic Department Name is required!" }),
  academicFaculty: z.string({
    required_error: "Academic Faculty Name is required!",
  }),
});
