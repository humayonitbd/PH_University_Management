import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHInput from "../../../../components/form/PHInput";
import PHform from "../../../../components/form/PHform";
import {SubmitHandler, FieldValues, Controller} from 'react-hook-form'
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import { useGetAcademicDepartmentsQuery, useGetAllSemestersQuery } from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import { useAddStudentMutation } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../../types";
import { TStudent } from "../../../../types/userManagement.type";



const studentData = [
  {
    password: "student123",
    student: {
      name: {
        firstName: "John2",
        middleName: "A.",
        lastName: "Doe",
      },
      gender: "male",
      deteOfBirth: "2000-01-01",
      bloodGroup: "A+",
      
      email: "student2@gmail.com",
      contactNo: "123-456-7896",
      emergencyContactNo: "098-765-4323",
      presentAddress: "123 Main St, Cityville, ST, 12345",
      permanentAddress: "456 Another St, Townville, ST, 67890",

      guardian: {
        fatherName: "James Doe",
        fatherOccupation: "Engineer",
        fatherContactNo: "111-222-3333",
        motherName: "Jane Doe",
        motherOccupation: "Teacher",
        motherContactNo: "444-555-6666",
      },

      localGurdian: {
        name: "Sam Smith",
        occupation: "Doctor",
        contactNo: "777-888-9999",
        address: "789 Nearby St, Neighborville, ST, 10111",
      },
      admitionSemister: "667bb47a182c83b8591ae496",
      academicDepartment: "667baf064cda72d63de56700",
    },
  },
];


const studentDefaultValues = {
    name: {
        firstName: "John2",
        middleName: "A.",
        lastName: "Doe",
      },
      gender: "male",
      bloodGroup: "A+",
      
      email: "student11@gmail.com",
      contactNo: "123-456-7811",
      emergencyContactNo: "098-765-4323",
      presentAddress: "123 Main St, Cityville, ST, 12345",
      permanentAddress: "456 Another St, Townville, ST, 67890",

      guardian: {
        fatherName: "James Doe",
        fatherOccupation: "Engineer",
        fatherContactNo: "111-222-3333",
        motherName: "Jane Doe",
        motherOccupation: "Teacher",
        motherContactNo: "444-555-6666",
      },

      localGurdian: {
        name: "Sam Smith",
        occupation: "Doctor",
        contactNo: "777-888-9999",
        address: "789 Nearby St, Neighborville, ST, 10111",
      },
      admitionSemister: "667bb47a182c83b8591ae496",
      academicDepartment: "667baf064cda72d63de56700",
}



const CreateStudent = () => {
  const [addStudentData, {data, error}] = useAddStudentMutation();
  console.log(data, error)
    const {data:sData, isLoading:issLoading} = useGetAllSemestersQuery(undefined);
    const {data:dData} = useGetAcademicDepartmentsQuery(undefined,{skip:issLoading});

    const semesterOptions = sData?.data?.map((item)=>({
        value:item._id,
        label:`${item.name} ${item.year}`,
    }))
    const departmentOptions = dData?.data?.map((item) => ({
      value: item._id,
      label: `${item.name}`,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async(data)=>{
       const toastId = toast.loading("Creating ...");
        console.log(data);
        const studentData = {
          password:'student123',
          student:data
        }
        const formData = new FormData();
        formData.append("data", JSON.stringify(studentData));
        formData.append("file", data.profileImg);
        // addStudentData(formData);
        try {
          console.log(studentData);
          const res = (await addStudentData(formData)) as TResponse<TStudent>;
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

        console.log(Object.entries(formData))
    }

    return (
      <Row>
        <Col span={24}>
          <PHform onSubmit={onSubmit} defaultValues={studentDefaultValues}>
            <Divider>Personal</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.firstName" label="First Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="name.middleName"
                  label="Middle Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.lastName" label="Last Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHDatePicker name="deteOfBirth" label="Date Of Birth" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  label="Blood Group"
                  name="bloodGroup"
                  options={bloodGroupOptions}
                />
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
            <Divider>Guardian</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherName"
                  label="Father Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherOccupation"
                  label="Father Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherContactNo"
                  label="Father Contact No"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherName"
                  label="Mother Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherOccupation"
                  label="Mother Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherContactNo"
                  label="Mother Contact No"
                />
              </Col>
            </Row>
            <Divider>Local Guardian</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="localGurdian.name" label="Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGurdian.occupation"
                  label="Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGurdian.contactNo"
                  label="Contact No"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGurdian.address"
                  label="Address"
                />
              </Col>
            </Row>
            <Divider>Academic Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  name="admitionSemister"
                  label="Addmission Semister"
                  disabled={issLoading}
                  options={semesterOptions}
                />
              </Col>
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

export default CreateStudent;