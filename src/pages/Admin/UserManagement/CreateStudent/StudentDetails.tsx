import { useParams } from "react-router-dom";
import {  useGetSingleStudentQuery } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { Col, Row } from "antd";



const StudentDetails = () => {
    const {studentId} = useParams();
 const { data } = useGetSingleStudentQuery(studentId);



  return (
    <div>
      <div>
        <h4
          style={{
            textAlign: "center",
            fontSize: "20px",
            marginBottom: "20px",
          }}
        >
          Student Info
        </h4>
        <Row gutter={12} style={{marginBottom:'10px'}}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Full Name:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.fullName}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Student Id:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.id}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Email:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.email}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Contact No:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.contactNo}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Gender:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.gender}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Blood Group:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.bloodGroup}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Emergency Contact No:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.emergencyContactNo}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Present Address:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.presentAddress}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Permanent Address:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.presentAddress}
              </span>
            </p>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Guardian Father Name:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.guardian?.fatherName}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Guardian Father Occupation:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.guardian?.fatherOccupation}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Guardian Father Contact No:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.guardian?.fatherContactNo}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Guardian Mother Name:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.guardian?.motherName}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Guardian Mother Occupation:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.guardian?.motherOccupation}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Guardian Mother Contact No:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.guardian?.motherContactNo}
              </span>
            </p>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Local Gurdian Name:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.localGurdian?.name}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Local Gurdian Occupation:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.localGurdian?.occupation}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Local Gurdian Contact No:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.localGurdian?.contactNo}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Local Gurdian Address:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.localGurdian?.address}
              </span>
            </p>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Admition Semister Name:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.admitionSemister?.name}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Admition Semister Year:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.admitionSemister?.year}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Admition Semister Start Months:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.admitionSemister?.startMonth}
              </span>
            </p>
            <p>
              <span
                style={{
                  marginRight: "2px",
                  fontSize: "17px",
                  fontWeight: "bolder",
                }}
              >
                Admition Semister End Months:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.admitionSemister?.endMonth}
              </span>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StudentDetails;