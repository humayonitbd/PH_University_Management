
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../../components/form/PHform";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { semisterStatusOptions } from "../../../../constants/semister";
import { toast } from "sonner";
import { TResponse } from "../../../../types";
import { useGetAllSemestersQuery } from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import PHInput from "../../../../components/form/PHInput";
import { useAddCourseMutation, useAddSemisterRegistrationMutation, useGetAllCourseQuery } from "../../../../redux/features/admin/CourseManagement/CourseManagement.api";
import { TCourse, TSemisterRegistration } from "../../../../types/coursesManagement";

const CreateCourse = () => {
 const {data:courses} = useGetAllCourseQuery(undefined);
  const coursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: `${item.title}`,
  }));
 
  const [addCourse] = useAddCourseMutation();
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating ...");

   const courseData = {
     ...data,
     code:Number(data.code),
     credits:Number(data.credits),
     preRequisiteCourses: data.preRequisiteCourses.map((item)=>({
        course:item,
        isDeleted:false,
     } ))
   };
    
   console.log('courseData', courseData)

    try {
      // console.log(semisterData);
      const res = (await addCourse(
        courseData
      )) as TResponse<TCourse>;
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
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="text" name="code" label="Code" />
          <PHInput type="text" name="credits" label="Credits" />
          <PHSelect
            mode="multiple"
            label="Pre Requisite Courses"
            name="preRequisiteCourses"
            options={coursesOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
