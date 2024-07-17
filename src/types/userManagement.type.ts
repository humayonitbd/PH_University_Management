import { TAcademicDepartment, TAcademicFaculty, TAcademicSemister } from "./academicManagement.type";

export type TStudent ={
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gender: string;
  deteOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGurdian: TLocalGurdian;
  admitionSemister: TAcademicSemister;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  profileImg: string;
  isDeleted: boolean;
  fullName: string;
}

export type TUser ={
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TName ={
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}

export type TGuardian ={
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
}

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
}





