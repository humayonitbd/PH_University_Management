import { useParams } from "react-router-dom";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { useFacultyAddMarkCourseMutation, useGetAllFacultyEnrolledCourseQuery  } from "../../../redux/features/faculty/facultyManagementApi";
import PHform from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";

const MyStudents = () => {
  const { registerSemisterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyEnrolledCourseQuery([
    { name: "semisterRegistration", value: registerSemisterId },
    { name: "course", value: courseId },
  ]);

  console.log(facultyCoursesData);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semisterRegistration, offeredCourse }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semisterRegistration: semisterRegistration?._id,
      student: student?._id,
      offeredCourse: offeredCourse?._id,
    })
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      key: "x",
      render: (item:any) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }:any) => {
  console.log(studentInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useFacultyAddMarkCourseMutation();

  const handleSubmit = async (data:any) => {
   const tostId= toast.loading('mark updateing..')
    const studentMark = {
      semisterRegistration: studentInfo.semisterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    console.log(studentMark);
    

    // console.log(res);
    try {
      const res = await addMark(studentMark).unwrap();
      if (res.success) {
        toast.success(`${res.message}`, { id: tostId, duration: 2000 });
      } else {
        toast.error(`${res.data.message}`, { id: tostId, duration: 2000 });
      }
       handleCancel();
    } catch (error:any) {
      toast.error(`${error.data.message}`, { id: tostId, duration: 2000 });
      handleCancel();
    }
    
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHform onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="midTerm" label="Midterm" />
          <PHInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Modal>
    </>
  );
};

export default MyStudents;
