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