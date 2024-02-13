import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourse from "../pages/faculty/MyCourse";
import MyStudent from "../pages/faculty/MyStudent";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Courses",
    path: "courses",
    element: <MyCourse />,
  },
  {
    path: "courses/:semesterRegistration/:course",
    element: <MyStudent />,
  },
];
