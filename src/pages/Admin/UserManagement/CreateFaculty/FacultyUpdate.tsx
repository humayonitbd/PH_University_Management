import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHInput from "../../../../components/form/PHInput";
import PHform from "../../../../components/form/PHform";
import { SubmitHandler, FieldValues, Controller } from "react-hook-form";
import PHSelect from "../../../../components/form/PHSelect";
import { genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";

import { useGetSingleFacultyQuery, useUpdateFacultyMutation } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../../types";
import { TFaculty } from "../../../../types/userManagement.type";
import { useParams } from "react-router-dom";

const FacultyUpdate = () => {
    const { facultyId } = useParams();
    const { data } = useGetSingleFacultyQuery(facultyId);
    console.log(data?.data)
  const [updateFacultyData] = useUpdateFacultyMutation();
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data,'data')
    const toastId = toast.loading("Creating ...");
    const facultyData = {
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.profileImg);

    try {
      console.log(facultyData);
      const res = (await updateFacultyData({
        id: facultyId,
        formData,
      })) as TResponse<TFaculty>;
      console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
      console.log(res);
    } catch (error: any) {
      toast.error("Something went wrong", { id: toastId });
    }

    console.log(Object.entries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHform onSubmit={onSubmit} defaultValues={data?.data}>
          <Divider>Personal</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect label="Gender" name="gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="deteOfBirth" label="Date Of Birth" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emargency Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Parmanent Address"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Row>
  );
};

export default FacultyUpdate;
