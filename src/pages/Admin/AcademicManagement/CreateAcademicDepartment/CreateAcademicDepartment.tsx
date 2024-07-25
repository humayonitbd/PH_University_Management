import { Button, Col, Flex } from "antd";
import PHform from "../../../../components/form/PHform";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import { useAddAcademicDepartmentMutation, useGetAcademicFacultiesQuery } from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "../../../../types";
import { TAcademicDepartment, TAcademicFaculty } from "../../../../types/academicManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../../schemas/academicDepartment.schema";
import { academicDepartmentOptions } from "../../../../constants/academicDepartment";

const CreateAcademicDepartment = () => {
    const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
    const {data:academicFaculty} = useGetAcademicFacultiesQuery(null);
    console.log("academic faculty", academicFaculty?.data);

    const academicFacultyOptions = academicFaculty?.data?.map((faculty) => ({
      value: faculty._id,
      label: `${faculty.name}`,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      const toastId = toast.loading("Creating ...");

      const departmentData = {
        name: data.name,
        academicFaculty: data.academicFaculty,
      };
      console.log(departmentData);
      try {
        // console.log(semisterData);
        const res = (await addAcademicDepartment(
          departmentData
        )) as TResponse<TAcademicDepartment>;
        if (res?.error) {
          toast.error(res?.error?.data?.message, { id: toastId });
        } else {
          toast.success(res?.data?.message, { id: toastId });
        }
        console.log(res);
      } catch (error: any) {
        toast.error("Something went wrong", { id: toastId });
      }
    };
    return (
      <Flex justify="center" align="center">
        <Col span={6}>
          <PHform
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <PHSelect
              label="Department Name"
              name="name"
              options={academicDepartmentOptions}
            />
            <PHSelect
              label="Academic Faculty"
              name="academicFaculty"
              options={academicFacultyOptions}
            />
            <Button htmlType="submit">Submit</Button>
          </PHform>
        </Col>
      </Flex>
    );
};

export default CreateAcademicDepartment;