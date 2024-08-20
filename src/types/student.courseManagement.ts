export type TMyOfferCourse {
  _id: string;
  semisterRegistration: string;
  academicFaculty: string;
  academicDepartment: string;
  course: TCourse;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: any[];
  completedCourses: any[];
  completedCourseIds: any[];
  isPreRequisitesFulfilled: boolean;
  isAlreadyEnrolled: boolean;
}

export type TCourse ={
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: any[];
  __v: number;
}
