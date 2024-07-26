import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery, useUpdateStudentMutation } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { SubmitHandler, FieldValues, Controller } from "react-hook-form";
import PHform from "../../../../components/form/PHform";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import { TResponse } from "../../../../types";
import { TStudent } from "../../../../types/userManagement.type";
import { toast } from "sonner";

const StudentUpdate = () => {
     const { studentId:id } = useParams();
     const { data:studentData } = useGetSingleStudentQuery(id);
    //  console.log("update student", studentData?.data);
     const [updateStudent] = useUpdateStudentMutation();
      
      const onSubmit: SubmitHandler<FieldValues> = async(data) => {
         const toastId = toast.loading("Updateing ...");
        //  console.log('profile img',data.profileImg)
        const updateUserData = {
          name: data.name,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          email: data.email,
          contactNo: data.contactNo,
          emergencyContactNo: data.emergencyContactNo,
          bloodGroup: data.bloodGroup,
          presentAddress: data.presentAddress,
          permanentAddress: data.permanentAddress,
          guardian: data.guardian,
          localGurdian: data.localGurdian,
        };
        
          const updateStudentData = {
            student: updateUserData,
          };
            console.log("update date", updateUserData);
        
        // updateStudent(formData);
        try {
          // console.log("update student data", updateStudentData);
          const formData = new FormData();
          formData.append("data", JSON.stringify(updateStudentData));
          if (data.profileImg) {
            formData.append("file", data.profileImg);
          }
          
          const res = (await updateStudent({id, formData})) as TResponse<TStudent>;
          // console.log('res',res);
          if (res?.error) {
            toast.error(res?.error?.data?.message, { id: toastId });
          } else {
            toast.success(res?.data?.message, { id: toastId });
          }
          // console.log(res);
        } catch (error: any) {
          toast.error("Something went wrong", { id: toastId });
        }

        // console.log('update student data console',Object.entries(formData));
      };
    return (
      <div>
        <h4
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "20px",
          }}
        >
          Update Student Info
        </h4>
        <Row>
          <Col span={24}>
            <PHform onSubmit={onSubmit} defaultValues={studentData?.data}>
              <Divider>Personal</Divider>
              <Row gutter={8}>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <PHInput
                    type="text"
                    name="name.firstName"
                    label="First Name"
                  />
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
                  <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
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

              <Button htmlType="submit">Submit</Button>
            </PHform>
          </Col>
        </Row>
      </div>
    );
};

export default StudentUpdate;