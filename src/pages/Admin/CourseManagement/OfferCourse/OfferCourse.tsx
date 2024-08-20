import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../../components/form/PHform";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { toast } from "sonner";
import { TResponse } from "../../../../types";
import { useGetAcademicDepartmentsQuery, useGetAcademicFacultiesQuery } from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import PHSelectByWatch from "../../../../components/form/PHSelectByWatch";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import PHInput from "../../../../components/form/PHInput";
import {useState} from "react"
import { useAddOfferedCoursMutation, useGetAllAssignCourseFacultyQuery, useGetAllCourseQuery, useGetAllSemestersRegistrationQuery } from "../../../../redux/features/admin/CourseManagement/CourseManagement.api";
import { useGetAllFacultysQuery } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { daysOptions } from "../../../../constants/global";
import PHTimePicker from "../../../../components/form/PHTimePicker";



const OfferCourse = () => {
    const [courseId, setCourseId] = useState('');
  const { data: academicDepartments } = useGetAcademicDepartmentsQuery(undefined);
  const { data: academicFaculty } = useGetAcademicFacultiesQuery(undefined);
  const { data: semisterRegistrations } = useGetAllSemestersRegistrationQuery(undefined);
  const { data: courses } = useGetAllCourseQuery(undefined);
  const { data: courseAssignfacultys } = useGetAllAssignCourseFacultyQuery(courseId, {skip:!courseId});
  const academicDepartmentOptions = academicDepartments?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));
  const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));
  const semisterRegistrationsOptions = semisterRegistrations?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemister.name}`,
    })
  );
  const coursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: `${item.title}`,
  }));
  const facultysOptions = courseAssignfacultys?.data?.faculties?.map((item:any) => ({
    value: item._id,
    label: `${item?.name?.firstName} ${item?.name?.middleName} ${item?.name?.lastName}`,
  }));

 
  const [addOfferedCourse] = useAddOfferedCoursMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating ...");

    
    const offerdCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
    };

    console.log(offerdCourseData);

    try {
      // console.log(semisterData);
      const res = (await addOfferedCourse(offerdCourseData)) as TResponse<any>;
      console.log("courseData res", res);
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHSelect
            label="Semister Registration"
            name="semisterRegistration"
            options={semisterRegistrationsOptions}
          />
          <PHSelect
            label="Academic Fatulty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <PHSelect
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions}
          />
          <PHSelectByWatch
            onValueChange={setCourseId}
            label="Course"
            name="course"
            options={coursesOptions}
          />
          <PHSelect
            label="Faculty"
            disabled={!courseId}
            name="faculty"
            options={facultysOptions}
          />
          <PHInput label="Max Capacity" type="number" name="maxCapacity" />
          <PHInput label="Section" type="number" name="section" />
          <PHSelect
            mode="multiple"
            label="Days"
            name="days"
            options={daysOptions}
          />
          <PHTimePicker label="Start Time" name="startTime" />
          <PHTimePicker label="End Time" name="endTime" />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
