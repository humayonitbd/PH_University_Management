import { useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { Col, Row } from "antd";

const AdminDetails = () => {
  const { adminId } = useParams();
  const { data, isFetching, isLoading } = useGetSingleAdminQuery(adminId);
console.log(data?.data)
  if(isFetching && isLoading){
    return <div>Lodding...</div>
  }

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
          Admin Info
        </h4>
        <Row gutter={12} style={{ marginBottom: "10px" }}>
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
                {`${data?.data?.name?.firstName} ${data?.data?.name?.middleName} ${data?.data?.name?.lastName}`}
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
                Faculty Id:
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
               Management Department Name:
              </span>{" "}
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                {data?.data?.managementDepartment?.name ? data?.data?.managementDepartment?.name : 'Not Available Management Department'}
              </span>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminDetails;
