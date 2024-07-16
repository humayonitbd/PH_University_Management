import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../../redux/features/admin/AcademicManagementApi/AcademicManagementApi";
import { TAcademicSemister } from "../../../../types/academicManagement.type";
import {useState} from 'react'
import { TQueryParams } from "../../../../types";

export type TTableData = Pick<TAcademicSemister, "name"|"year"|"endMonth"|"startMonth">
const AcademicSemister = () => {
    const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
    const { data: semisterData, isLoading, isFetching } = useGetAllSemestersQuery(params);
    // console.log("Academic Semister", semisterData);
    
    const tableData = semisterData?.data?.map(
      ({ _id, name, startMonth, endMonth, year }) => ({
        key:_id,
        name,
        startMonth,
        endMonth,
        year,
      })
    );

    const columns: TableColumnsType<TTableData> = [
      {
        title: "Name",
        dataIndex: "name",
        showSorterTooltip: { target: "full-header" },
        filters: [
          {
            text: "Autumn",
            value: "Autumn",
          },
          {
            text: "Summer",
            value: "Summer",
          },
          {
            text: "Fall",
            value: "Fall",
          },
        ],
      },
      {
        title: "Year",
        dataIndex: "year",
        filters: [
          {
            text: "2024",
            value: "2024",
          },
          {
            text: "2025",
            value: "2025",
          },
          {
            text: "2026",
            value: "2026",
          },
        ],
      },
      {
        title: "Start Month",
        dataIndex: "startMonth",
      },
      {
        title: "End Month",
        dataIndex: "endMonth",
      },
      {
        title: "Action",
        dataIndex: "x",
        render:()=>{
            return <div><Button>Update</Button></div>
        }
      },
    ];


    const onChange: TableProps<TTableData>["onChange"] = (
      _pagination,
      filters,
      _sorter,
      extra
    ) => {
     if(extra.action === 'filter'){
        const queryParam: TQueryParams[] = [];
        console.log(filters)
        filters?.name?.forEach((item)=> queryParam.push({name:'name',value:item}))

        filters?.year?.forEach((item)=> queryParam.push({name:'year',value:item}))

       
        setParams(queryParam);
     }
    };


    if(isLoading){
        return <div>Lodding...</div>
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

export default AcademicSemister;