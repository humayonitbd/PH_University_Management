import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHInput from "../../../../components/form/PHInput";
import PHform from "../../../../components/form/PHform";
import { SubmitHandler, FieldValues, Controller } from "react-hook-form";
import PHSelect from "../../../../components/form/PHSelect";
import { genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import { useGetAcademicDepartmentsQuery } from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import { useAddAdminMutation, useAddFacultyMutation } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../../types";
import { TAdmin, TFaculty } from "../../../../types/userManagement.type";

const adminData = [
  {
    password: "admin123",
    admin: {
      name: {
        firstName: "Humayon",
        middleName: "forid",
        lastName: "akash",
      },
      designation: "Professor",
      gender: "male",
      dateOfBirth: "1980-01-01",
      email: "admin1@gmail.com",
      contactNo: "12345678910",
      emergencyContactNo: "0987654321",
      presentAddress: "123 Main St, City, Country",
      permanentAddress: "456 Another St, City, Country",
      managementDepartment: "60b90e1e382acc3e68d6f05e",
      isDeleted: false,
    },
  },
];

const adminDefaultValues = {
  name: {
    firstName: "Humayon",
    middleName: "forid",
    lastName: "akash",
    _id: "667bde1bae3626f871d4db87",
  },
  designation: "Professor",
  gender: "male",
 
  email: "admin1@gmail.com",
  contactNo: "12345678910",
  emergencyContactNo: "0987654321",
  presentAddress: "123 Main St, City, Country",
  permanentAddress: "456 Another St, City, Country",
  profileImg: "",
  managementDepartment: "60b90e1e382acc3e68d6f05e",

};

const managementDepartment = [
  {
  _id:"60b90e1e382acc3e68d6f05e",
  name:"Management Department-1"
},
{
  _id:"60b90e1e382acc3e68d6f06a",
  name:"Management Department-2"
}
]

const CreateAdmin = () => {
  const [addAdminData] = useAddAdminMutation();
  
  const managementDepartmentOptions = managementDepartment?.map(
    (item) => ({
      value: item._id,
      label: `${item.name}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating ...");
    const adminData = {
      password: "admin123",
      admin: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.profileImg);

    try {
      console.log(adminData);
      const res = (await addAdminData(formData)) as TResponse<TAdmin>;
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
        <PHform onSubmit={onSubmit} defaultValues={adminDefaultValues}>
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
          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="managementDepartment"
                label="Management Department"
                options={managementDepartmentOptions}
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
