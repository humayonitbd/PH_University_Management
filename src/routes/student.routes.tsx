
import MyCourseSchedule from "../pages/Student/MyCourseSchedule/MyCourseSchedule";
import OfferedCourse from "../pages/Student/OfferedCourse/OfferedCourse";
import StudentDashboard from "../pages/Student/StudentDashboard/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
  {
    name: "My Course Schedule",
    path: "my-course-schedule",
    element: <MyCourseSchedule />,
  },
];
