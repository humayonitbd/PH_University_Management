// import { ReactNode } from "react";

import AcademicDepartment from "../pages/Admin/AcademicManagement/AcademicDepartment/AcademicDepartment";
import AcademicFaculty from "../pages/Admin/AcademicManagement/AcademicFaculty/AcademicFaculty";
import AcademicSemister from "../pages/Admin/AcademicManagement/AcademicSemister/AcademicSemister";
import CreateAcademicDepartment from "../pages/Admin/AcademicManagement/CreateAcademicDepartment/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/Admin/AcademicManagement/CreateAcademicFaculty/CreateAcademicFaculty";
import CreateAcademicSemister from "../pages/Admin/AcademicManagement/CreateAcademicSemister/CreateAcademicSemister";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import AdminDetails from "../pages/Admin/UserManagement/CreateAdmin/AdminDetails";
import AdminUpdate from "../pages/Admin/UserManagement/CreateAdmin/AdminUpdate";
import Admins from "../pages/Admin/UserManagement/CreateAdmin/Admins";
import CreateAdmin from "../pages/Admin/UserManagement/CreateAdmin/CreateAdmin";
import CreateFaculty from "../pages/Admin/UserManagement/CreateFaculty/CreateFaculty";
import FacultyDetails from "../pages/Admin/UserManagement/CreateFaculty/FacultyDetails";
import FacultyUpdate from "../pages/Admin/UserManagement/CreateFaculty/FacultyUpdate";
import Facultys from "../pages/Admin/UserManagement/CreateFaculty/Facultys";
import CreateStudent from "../pages/Admin/UserManagement/CreateStudent/CreateStudent";
import StudentDetails from "../pages/Admin/UserManagement/CreateStudent/StudentDetails";
import StudentUpdate from "../pages/Admin/UserManagement/CreateStudent/StudentUpdate";
import Students from "../pages/Admin/UserManagement/CreateStudent/Students";
// import { NavLink } from "react-router-dom";

// type TRoute = {
//   path:string;
//   element:ReactNode;
// }

// type TSidebarItem = {
//   key: string;
//   label: ReactNode;
//   children?: TSidebarItem[];
// };

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemister />,
      },
      {
        name: "Academic-Semester",
        path: "academic-semester",
        element: <AcademicSemister />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic-Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic-Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Student",
        path: "student-data-list",
        element: <Students />,
      },
      {
        path: "student-data-list/:studentId",
        element: <StudentDetails />,
      },
      {
        path: "student-update/:studentId",
        element: <StudentUpdate />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Faculty",
        path: "faculty-data-list",
        element: <Facultys />,
      },
      {
        path: "faculty-data-list/:facultyId",
        element: <FacultyDetails />,
      },
      {
        path: "faculty-update/:facultyId",
        element: <FacultyUpdate />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Admin",
        path: "admin-data-list",
        element: <Admins />,
      },
      {
        path: "admin-data-list/:adminId",
        element: <AdminDetails />,
      },
      {
        path: "admin-update/:adminId",
        element: <AdminUpdate />,
      },
    ],
  },
];


// export const adminSidebarItems = adminPaths.reduce((acc: TSidebarItem[], item) => {
//   if (item.path && item.name) {
//     acc.push({
//       key: item.name,
//       label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//     });
//   }

//   if (item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//       })),
//     });
//   }

//   return acc;
// }, []);



//! Programetical way

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }

//   return acc;
// }, []);


//! Hard coded way

// export const adminPaths = [
//   {
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
// ];