import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../../components/form/PHform";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { semisterOptions } from "../../../../constants/semister";
import { monthOptions } from "../../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../../schemas/academicSemister.Schema";
import { useAddAcademicSemisterMutation } from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../../types";
import { TAcademicSemister } from "../../../../types/academicManagement.type";


const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemister = () => {
  const [addAcademicSemister] = useAddAcademicSemisterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating ...");
    const name = semisterOptions[Number(data.name) - 1]?.label;
    const semisterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      console.log(semisterData);
      const res = (await addAcademicSemister(semisterData)) as TResponse<TAcademicSemister>;
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
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={semisterOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemister;
