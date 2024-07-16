import { Button, Col, Flex } from "antd";
import PHform from "../../../../components/form/PHform";
import PHSelect from "../../../../components/form/PHSelect";
import { useAddAcademicFacultyMutation } from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TResponse } from "../../../../types";
import { TAcademicFaculty } from "../../../../types/academicManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../../schemas/academicFaculty.schema";
import { academicFacultyOptions } from "../../../../constants/academicFaculty";

const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useAddAcademicFacultyMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      const toastId = toast.loading("Creating ...");
      const academicFacultyData = {
        name:data.name,
        
      };
      try {
        console.log(academicFacultyData);
        const res = (await addAcademicFaculty(
          academicFacultyData
        )) as TResponse<TAcademicFaculty>;
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
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHSelect label="Name" name="name" options={academicFacultyOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
