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


/// faculty type here 

export interface TFaculty {
  _id: string;
  id: string;
  user: TUser;
  name: Name;
  designation: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicFaculty: AcademicFaculty;
  academicDepartment: AcademicDepartment;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}

export interface AcademicFaculty {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AcademicDepartment {
  _id: string;
  name: string;
  academicFaculty: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// admin type here 
export type TAdmin = {
  _id: string;
  id: string;
  user: TUser;
  name: TAName;
  designation: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  managementDepartment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TAName ={
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}



