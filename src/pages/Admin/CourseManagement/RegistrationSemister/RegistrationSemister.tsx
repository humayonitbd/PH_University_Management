

import { Button, Dropdown, Table, TableColumnsType, TableProps, Tag } from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../../types";
import { useGetAllSemestersRegistrationQuery, useUpdateSemisterRegistrationStatusMutation } from "../../../../redux/features/admin/CourseManagement/CourseManagement.api";
import { TSemisterRegistration } from "../../../../types/coursesManagement";
import moment from "moment";

export type TTableData = Pick<
  TSemisterRegistration,
  "academicSemister" | "status" | "startDate" | "endDate"|"maxCredit"|"minCredit"
> ;

type IDopItem = {
    label:string,
    key:string,
}

const items:IDopItem[] = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];


const RegistrationSemister = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [semisterId, setSemisterId] = useState('')
  const {
    data: semisterRegisterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersRegistrationQuery(params);
  const [updateSemisterRegistrationStatus] = useUpdateSemisterRegistrationStatusMutation();
  // console.log("Academic Semister", semisterData);
const handleStatusUpdate=(data:any)=>{
    console.log("semister id ", semisterId);
    console.log('status data',data.key)
    const updateData = {
        id:semisterId,
        data:{
            status:data.key
        }
    }
    updateSemisterRegistrationStatus(updateData);
};
  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  }; 



  const tableData = semisterRegisterData?.data?.map(
    ({
      _id,
      academicSemister,
      startDate,
      endDate,
      status,
      minCredit,
      maxCredit,
    }) => ({
      key: _id,
      name: `${academicSemister.name} ${academicSemister.year}`,
      startDate: moment(new Date(startDate)).format("ll"),
      endDate: moment(new Date(endDate)).format("ll"),
      status,
      minCredit,
      maxCredit,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Max Credit",
      dataIndex: "maxCredit",
    },
    {
      title: "Min Credit",
      dataIndex: "minCredit",
    },
    {
      title: "Action",
      dataIndex: "x",
      render: (_, record) => {
        console.log(record)
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemisterId(record.key)}>Update</Button>
          </Dropdown>
        );
      },
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
    <div>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
    </div>
  );
};

export default RegistrationSemister;