import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHInput from "../../../../components/form/PHInput";
import PHform from "../../../../components/form/PHform";
import {
  SubmitHandler,
  FieldValues,
  Controller,
  
} from "react-hook-form";
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
    const { data: facultySingleData, isLoading } =
      useGetSingleFacultyQuery(facultyId);
    // console.log("faculty single data", facultySingleData?.data?.dateOfBirth);
  const [updateFacultyData] = useUpdateFacultyMutation();
  // console.log('update hoar por data', data)
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data,'data')
    const toastId = toast.loading("Creating ...");
    const upFacultyData = {
      name: data.name,
      gender: data.gender,
      designation: data.designation,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      contactNo: data.contactNo,
      emergencyContactNo: data.emergencyContactNo,
      presentAddress: data.presentAddress,
      permanentAddress: data.permanentAddress,
    };

    const facultyData = {
      faculty: upFacultyData,
    };

    console.log('facultyData', facultyData);

    try {
      // console.log(facultyData, 'file', data.profileImg);
      const formData = new FormData();
      formData.append("data", JSON.stringify(facultyData));
      if (data.profileImg) {
        formData.append("file", data.profileImg);
      }

      const res = (await updateFacultyData({id: facultyId,formData})) as TResponse<TFaculty>;
      // console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
      // console.log(res);
    } catch (error: any) {
      toast.error("Something went wrong", { id: toastId });
    }

    // console.log(Object.entries(formData));
  };

  if (isLoading) {
    return <div>Looding.....</div>;
  }
  return (
    <Row>
      <Col span={24}>
        <PHform onSubmit={onSubmit} defaultValues={facultySingleData?.data}>
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
              <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
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
