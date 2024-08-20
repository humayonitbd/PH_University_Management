import FacultyDashboard from "../pages/Faculty/FacultyDashboard/FacultyDashboard";
import MyCourses from "../pages/Faculty/MyCourses/MyCourses";
import MyStudents from "../pages/Faculty/MyStudents/MyStudents";


export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Course",
    path: "my-course",
    element: <MyCourses />,
  },
  {
    path: "course/:registerSemisterId/:courseId",
    element: <MyStudents />,
  },
  
];