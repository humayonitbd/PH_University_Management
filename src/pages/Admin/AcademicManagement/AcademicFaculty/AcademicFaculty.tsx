import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import { TAcademicFaculty } from "../../../../types/academicManagement.type";

export type TTableData = Pick<
  TAcademicFaculty,
  "name" 
>;
const AcademicFaculty = () => {
  const {
    data: academicFaculty,
    isLoading,
    isFetching,
  } = useGetAcademicFacultiesQuery(undefined);
  console.log("Academic Semister", academicFaculty);
  
    const tableData = academicFaculty?.data?.map(
      ({ _id, name}) => ({
        key: _id,
        name,
      })
    );

    const columns: TableColumnsType<TTableData> = [
      {
        title: "Name",
        dataIndex: "name",
        showSorterTooltip: { target: "full-header" },
        
      },
      {
        title: "Action",
        dataIndex: "x",
        render: () => {
          return (
            <div>
              <Button>Update</Button>
            </div>
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
    //   if (extra.action === "filter") {
    //     const queryParam: TQueryParams[] = [];
    //     console.log(filters);
    //     filters?.name?.forEach((item) =>
    //       queryParam.push({ name: "name", value: item })
    //     );

    //     filters?.year?.forEach((item) =>
    //       queryParam.push({ name: "year", value: item })
    //     );

    //     setParams(queryParam);
    //   }
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
        />
      </div>
    );
};

export default AcademicFaculty;