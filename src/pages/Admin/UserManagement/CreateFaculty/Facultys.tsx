
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
import { TFaculty } from "../../../../types/userManagement.type";
import { useGetAllFacultysQuery } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import { Link } from "react-router-dom";
import Modal from "../../../../components/ui/Modal";

export type TTableData = Pick<
  TFaculty,
  "name" | "id" | "email" | "contactNo" | "_id"
> & {
  status: string;
  userId: string;
};
const Facultys = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: facultys,
    isLoading,
    isFetching,
  } = useGetAllFacultysQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  // console.log("Academic Semister", students);

  const totalData = facultys?.meta;

  const tableData = facultys?.data?.map(
    ({ _id, name, id, email, contactNo, user }) => ({
      key: _id,
      _id,
      name: `${name.firstName} ${name.middleName} ${name.lastName}`,
      id,
      email,
      contactNo,
      status: user.status,
      userId: user._id,
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
      title: "User Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "x",
      render: (_, record) => {
        console.log(record);
        return (
          <Space>
            <Link to={`/admin/faculty-data-list/${record._id}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/faculty-update/${record._id}`}>
              <Button>Update</Button>
            </Link>
            <Modal id={record.userId} />
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

export default Facultys;
