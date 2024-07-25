import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHInput from "../../../../components/form/PHInput";
import PHform from "../../../../components/form/PHform";
import { SubmitHandler, FieldValues, Controller } from "react-hook-form";
import PHSelect from "../../../../components/form/PHSelect";
import { genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import {
  useGetAcademicDepartmentsQuery,
} from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import { useAddFacultyMutation } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../../types";
import { TFaculty } from "../../../../types/userManagement.type";

const facultyData = [
  {
    password: "faculty123",
    faculty: {
      name: {
        firstName: "malek",
        middleName: "khan",
        lastName: "valo",
      },
      designation: "junior Professor",
      gender: "male",
      dateOfBirth: "1980-01-01",
      email: "faculty3@gmail.com",
      contactNo: "123145678933",
      emergencyContactNo: "0987654321",
      presentAddress: "123 Main St",
      permanentAddress: "456 Another St",
      academicDepartment: "667baf064cda72d63de56700",
      isDeleted: false,
    },
  },
];

const facultyDefaultValues = {
  name: {
    firstName: "malek",
    middleName: "khan",
    lastName: "valo",
  },
  designation: "junior Professor",
  gender: "male",
  dateOfBirth: "1980-01-01",
  email: "faculty3@gmail.com",
  contactNo: "123145678933",
  emergencyContactNo: "0987654321",
  presentAddress: "123 Main St",
  permanentAddress: "456 Another St",
  academicDepartment: "667baf064cda72d63de56700",
  
};

const CreateFaculty = () => {
  const [addFacultyData, { data, error }] = useAddFacultyMutation();
  console.log(data, error);
  const { data: dData } = useGetAcademicDepartmentsQuery(undefined);

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating ...");
    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.profileImg);
  
    try {
      console.log(facultyData);
      const res = (await addFacultyData(formData)) as TResponse<TFaculty>;
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
        <PHform onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
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
          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={departmentOptions}
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
