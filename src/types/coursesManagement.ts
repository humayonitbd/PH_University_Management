import { TAcademicSemister } from "./academicManagement.type";

export type TSemisterRegistration = {
    _id:string,
  academicSemister: TAcademicSemister;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};


export type TCourse = {
  _id:string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: string;
  isDeleted: boolean;
};


export type TDays = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type TOfferedCourse = {
  _id:string;
  semisterRegistration: string;
  academicsemister?: string;
  academicFaculty: string;
  academicDepartment: string;
  course: TCourse;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: TDays[];
  startTime: string;
  endTime: string;
};