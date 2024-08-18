import {
  Button,
  Dropdown,
  Modal,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { useState } from "react";
import { TQueryParams, TResponse } from "../../../../types";
import {
    useAssintFacultyCourseMutation,
    useGetAllCourseQuery,
  useGetAllSemestersRegistrationQuery,
  useUpdateSemisterRegistrationStatusMutation,
} from "../../../../redux/features/admin/CourseManagement/CourseManagement.api";
import { TSemisterRegistration } from "../../../../types/coursesManagement";
import moment from "moment";
import { useGetAllFacultysQuery } from "../../../../redux/features/admin/UserManagementApi/UserManagementApi";
import PHform from "../../../../components/form/PHform";
import PHSelect from "../../../../components/form/PHSelect";
import { toast } from "sonner";

export type TTableData = Pick<
  TSemisterRegistration,
  | "academicSemister"
  | "status"
  | "startDate"
  | "endDate"
  | "maxCredit"
  | "minCredit"
>;


const Course = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [semisterId, setSemisterId] = useState("");
  const {
    data: courses,
    isLoading,
    isFetching,
  } = useGetAllCourseQuery(params);
  
 
//   const handleStatusUpdate = (data: any) => {
//     console.log("semister id ", semisterId);
//     console.log("status data", data.key);
//     const updateData = {
//       id: semisterId,
//       data: {
//         status: data.key,
//       },
//     };
//     updateSemisterRegistrationStatus(updateData);
//   };

  

  const tableData = courses?.data?.map(
    ({
      _id,
     title,
     code,
     prefix,
     credits
    }) => ({
      key: _id,
      name: title,
      code: `${prefix} -${code}`,
      credits
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
    },

    {
      title: "Action",
      dataIndex: "x",
      render: (_, record) => {
        return <AddFacultyModal coursedata={record} />;
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


const AddFacultyModal = ({coursedata}:any)=>{
     const [isModalOpen, setIsModalOpen] = useState(false);

const {data:facultys} = useGetAllFacultysQuery(undefined);
const facultyOption = facultys?.data?.map((item) => ({
  value: item._id,
  label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
}));

     const showModal = () => {
       setIsModalOpen(true);
     };

     const handleOk = () => {
       setIsModalOpen(false);
     };

     const handleCancel = () => {
       setIsModalOpen(false);
     };

     const [AssintFacultyCourse] = useAssintFacultyCourseMutation();
     const handleSubmit = async(data:any)=>{
         const toastId = toast.loading("Creating ...");
        const assinData = {
          id: coursedata.key,
          data
        };
        console.log("assinData",assinData)
        try {
          // console.log(semisterData);
          const res = (await AssintFacultyCourse(assinData)) as TResponse<any>;
          console.log("courseData res", res);
          if (res?.error) {
            toast.error(res?.error?.data?.message, { id: toastId });
          } else {
            toast.success(res?.data?.message, { id: toastId });
          }
        } catch (error: any) {
          toast.error("Something went wrong", { id: toastId });
        }
      
     }
    return (
      <>
        <Button onClick={showModal}>Assign Faculty</Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <PHform onSubmit={handleSubmit}>
            <PHSelect
              mode="multiple"
              options={facultyOption}
              name="faculties"
              label="Faculty"
            />
            <Button htmlType="submit">Submit</Button>
          </PHform>
        </Modal>
      </>
    );
}




export default Course;
