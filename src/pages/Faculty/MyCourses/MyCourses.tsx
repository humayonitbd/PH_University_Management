import { Button, Col, Flex } from "antd";
import { useGetAllFacultyEnrolledCourseQuery } from "../../../redux/features/faculty/facultyManagementApi";
import PHform from "../../../components/form/PHform";
import PHSelect from "../../../components/form/PHSelect";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";

const MyCourses = () => {
    const { data: facultyEnrolledCourse } =
      useGetAllFacultyEnrolledCourseQuery(undefined);
    console.log("faculty ecrolled course", facultyEnrolledCourse?.data);
    const navigate = useNavigate();

   

    const semesterOptions = facultyEnrolledCourse?.data?.map((item) => ({
      label: `${item.semisterRegistration?.academicSemister?.name} ${item.semisterRegistration?.academicSemister?.year}`,
      value: item.semisterRegistration?._id,
    }));

    const courseOptions = facultyEnrolledCourse?.data?.map((item) => ({
      label: item.course?.title,
      value: item.course?._id,
    }));

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      navigate(`/faculty/course/${data?.semisterRegistration}/${data?.course}`);
    };
    return (
      <Flex justify="center" align="center">
        <Col span={6}>
          <PHform onSubmit={onSubmit}>
            <PHSelect
              options={semesterOptions}
              name="semisterRegistration"
              label="Semester"
            />
            <PHSelect options={courseOptions} name="course" label="Course" />
            <Button htmlType="submit">Submit</Button>
          </PHform>
        </Col>
      </Flex>
    );
};

export default MyCourses;