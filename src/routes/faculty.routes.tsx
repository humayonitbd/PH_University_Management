import FacultyDashboard from "../pages/Faculty/FacultyDashboard/FacultyDashboard";
import OfferedCourse from "../pages/Faculty/OfferedCourse/OfferedCourse";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered-Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
  
];