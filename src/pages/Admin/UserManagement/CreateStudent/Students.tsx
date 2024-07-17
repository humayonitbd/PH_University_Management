import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import { TAcademicSemister } from "../../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParams } from "../../../../types";
import { TStudent } from "../../../../types/userManagement.type";
import { useGetAllStudentsQuery } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { Link } from "react-router-dom";

export type TTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNo">;
const Students = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page,setPage] = useState(1);
  const {
    data: students,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  // console.log("Academic Semister", students);

  const totalData = students?.meta;

  const tableData = students?.data?.map(({ _id, fullName, id, email,contactNo }) => ({
    key: _id,
    fullName,
    id,
    email,
    contactNo
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      dataIndex: "x",
      render: (record) => {
        console.log(record);
        return (
          <Space>
            <Button>Update</Button>
            {/* <Link to={`/admin/student-data-list/${item?.key}`}> */}
            <Button>Details</Button>
            {/* </Link> */}
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // if (extra.action === "filter") {
    //   const queryParam: TQueryParams[] = [];
    //   console.log(filters);
    //   filters?.name?.forEach((item) =>
    //     queryParam.push({ name: "name", value: item })
    //   );

    //   filters?.year?.forEach((item) =>
    //     queryParam.push({ name: "year", value: item })
    //   );

    //   setParams(queryParam);
    // }
  };

  if (isLoading) {
    return <div>Lodding...</div>;
  }

  return (
    <>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination pageSize={totalData?.limit} onChange={(value)=> setPage(value)} total={totalData?.total} />
    </>
  );
};

export default Students;
