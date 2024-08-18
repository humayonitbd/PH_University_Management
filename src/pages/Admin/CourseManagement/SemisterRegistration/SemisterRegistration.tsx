
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
import { useAddSemisterRegistrationMutation } from "../../../../redux/features/admin/CourseManagement/CourseManagement.api";
import { TSemisterRegistration } from "../../../../types/coursesManagement";


const SemisterRegistration = () => {
    const {data:academicSemister} = useGetAllSemestersQuery([
        {name:'sort', value:'year'}
    ]);
    const academicSemisterOptions = academicSemister?.data?.map((item)=>({
        value:item._id,
        label:`${item.name} ${item.year}`
    }))
    const semisterStatusOption = semisterStatusOptions?.map((item) => ({
      value: item.value,
      label: item.label,
    }));

    const [addSemisterRegistration] = useAddSemisterRegistrationMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating ...");
    const semisterRegistrationData = {
      ...data,
      minCredit:Number(data.minCredit),
      maxCredit:Number(data.maxCredit)
    };
     console.log("semisterRegistrationData ", semisterRegistrationData);
    try {
      // console.log(semisterData);
      const res = (await addSemisterRegistration(
        semisterRegistrationData
      )) as TResponse<TSemisterRegistration>;
      console.log("semisterRegistrationData res", res);
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
            label="Academic Semister"
            name="academicSemister"
            options={academicSemisterOptions}
          />
          <PHSelect
            label="Semister Status"
            name="status"
            options={semisterStatusOption}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="number" name="minCredit" label="Min Credit" />
          <PHInput type="number" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default SemisterRegistration;
