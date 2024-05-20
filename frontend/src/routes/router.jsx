import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Student/Payment/History/Payment";
import CourseDetails from "../pages/Dashboard/Student/Enroll/CourseDetails";
import InstructorCP from "../pages/Dashboard/Instructor/InstructorCP";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import PendingCourses from "../pages/Dashboard/Instructor/PendingCourses";
import ApprovedCourse from "../pages/Dashboard/Instructor/ApprovedCourse";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import UpdateUser from "../pages/Dashboard/Admin/UpdateUser";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path:"/",
            element:<Home/>
        },
        {
            path:'/instructors',
            element:<Instructors/>
        },
        {
            path:'/classes',
            element:<Classes/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/class/:id',
          element:<SingleClass/>,
          loader: ({params}) => fetch(`https://smart-class-hub.onrender.com/class/${params.id}`)
        }
      ]
    },
    {
      path:'/dashboard',
      element: <DashboardLayout/>,
      children:[
        {
          index: true,
          element: <Dashboard/>
        },

        //student routes
        {
          path: 'student-cp',
          element : <StudentCP/>
        },
        {
          path:'enrolled-class',
          element:<EnrolledClasses/>
        },
        {
          path:'my-selected',
          element:<SelectedClass/>
        },
        {
          path:'my-payments',
          element:<MyPaymentHistory/>
        },
        {
          path:'apply-instructor',
          element:<AsInstructor/>
        },
        {
          path:'user/payment',
          element:<Payment/>
        },
        {
          path:"course-details",
          element: <CourseDetails/>
        },
        {
          path:'instructor-cp',
          element:<InstructorCP/>
        },
        {
          path:'add-class',
          element:<AddClass/>
        },
        {
          path:'my-classes',
          element:<MyClasses/>
        },
        {
          path : "my-pending",
          element:<PendingCourses/>
        },
        {
          path:"my-approved",
          element:<ApprovedCourse/>
        },
        {
          path:"admin-home",
          element:<AdminHome/>
        },
        {
          path:'manage-class',
          element: <ManageClasses/>
        },
        {
          path:'manage-users',
          element:<ManageUsers/>
        },
        {
          path:'update-user/:id',
          element: <UpdateUser/>,
          loader : ({params}) =>fetch(`https://smart-class-hub.onrender.com/users/${params.id}`)
        }

      ]
    }
  ]);