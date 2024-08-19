
import {
  Button,
  Dropdown,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../../types";
import {
  useGetAllOfferCourseQuery,
} from "../../../../redux/features/admin/CourseManagement/CourseManagement.api";
import { TOfferedCourse } from "../../../../types/coursesManagement";



export type TTableData = Pick<
  TOfferedCourse,
  "course" | "faculty" | "maxCapacity" |
  "endTime"|
  "startTime" |
  "section"
>;



const OfferedCourses = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: offerdCourseDatas,
    isLoading,
    isFetching,
  } = useGetAllOfferCourseQuery(params);

  console.log('offered coursed', offerdCourseDatas?.data)
  

  const tableData = offerdCourseDatas?.data?.map(
    ({ _id, course, maxCapacity, endTime, startTime, section }) => ({
      key: _id,
      name: `${course?.title} `,
      maxCapacity,
      endTime,
      startTime,
      section,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
    },
    {
      title: "Max Capacity",
      dataIndex: "maxCapacity",
    },
    {
      title: "Section",
      dataIndex: "section",
    },

    {
      title: "Action",
      dataIndex: "x",
      render: (_, record) => {
        return (
          
            <Button>more view</Button>
        
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

export default OfferedCourses;