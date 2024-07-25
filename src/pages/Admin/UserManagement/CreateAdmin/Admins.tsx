import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../../types";
import { TAdmin } from "../../../../types/userManagement.type";
import { useGetAllAdminsQuery } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { Link } from "react-router-dom";

export type TTableData = Pick<
  TAdmin,
  "name" | "id" | "email" | "contactNo" | "_id"
>;
const Admins = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: admins,
    isLoading,
    isFetching,
  } = useGetAllAdminsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  // console.log("Academic Semister", students);

  const totalData = admins?.meta;

  const tableData = admins?.data?.map(
    ({ _id, name, id, email, contactNo }) => ({
      key: _id,
      _id,
      name: `${name.firstName} ${name.middleName} ${name.lastName}`,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
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
      render: (_, record) => {
        console.log(record);
        return (
          <Space>
            <Link to={`/admin/admin-data-list/${record._id}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/admin-update/${record._id}`}>
              <Button>Update</Button>
            </Link>
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
      <Pagination
        pageSize={totalData?.limit}
        onChange={(value) => setPage(value)}
        total={totalData?.total}
      />
    </>
  );
};

export default Admins;
