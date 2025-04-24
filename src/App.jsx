import { Route, Routes } from "react-router-dom";
import AdminLogin from "./components/forms/AdminLogin";
import SignUp from "./components/forms/SignUp";
import StudentPortal from "./pages/StudentPortal";
import QueryForm from "./components/forms/QueryForm";
import Home from "./pages/HomePage";
import MaterialForm from "./components/forms/MaterialForm";
import Loader from "./components/basicComponents/Loader";
import StudentLogin from "./components/studentPortalPage/StudentLogin";
import AdmissionPage from "./pages/AdmissionPage.jsx";
import MyProfile from "./components/studentPortalPage/MyProfile.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import Professors from "./components/adminPage/Professors.jsx";
import Student from "./components/adminPage/Student.jsx";
import Courses from "./components/adminPage/Courses.jsx";
import Circulation from "./components/adminPage/Circulation.jsx";
import AlumniNetwork from "./components/Home/Alumni Network/AlumniNetwork.jsx";
import AlumniCard from "./components/Home/Alumni Network/AlumniCard.jsx";
import Assignments from "./components/studentPortalPage/Assignments.jsx";
import Exam from "./components/studentPortalPage/Exam.jsx";
import Payments from "./components/studentPortalPage/Payments.jsx";
import CourseMaterial from "./components/studentPortalPage/CourseMaterial.jsx";
import Attendance from "./components/studentPortalPage/Attendence.jsx";
import ProtectedRoutes from "./components/basicComponents/ProtectedRoutes.jsx";
import Commerce from "./components/Home/Program/Commerce.jsx";
import ComputerScience from "./components/Home/Program/ComputerScience.jsx";
import Management from "./components/Home/Program/Management.jsx";
import SubjectInfo from "./components/Home/Program/SubjectInfo.jsx";
import AdmissionsRequest from "./components/adminPage/AdmissionsRequest.jsx";
import AdminProfile from "./components/adminPage/AdminProfile.jsx";

function App() {
  return (
    <div className="w-screen h-full font-mono">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/queryform" element={<QueryForm />}></Route>
        <Route path="/materialform" element={<MaterialForm />}></Route>
        <Route path="/loader" element={<Loader />}></Route>
        <Route path="/alumni" element={<AlumniNetwork />}></Route>
        <Route path="/alumnicard" element={<AlumniCard />}></Route>
        <Route path="/Commerce" element={<Commerce />}></Route>
        <Route path="/ComputerScience" element={<ComputerScience />}></Route>
        <Route path="/Management" element={<Management />}></Route>
        <Route path="/SubjectInfo" element={<SubjectInfo />}></Route>
        <Route path="/admissionpage" element={<AdmissionPage />}></Route>


        {/* Student Portal Routes */}
        <Route path="/studentlogin" element={<StudentLogin />}></Route>
        <Route element={<ProtectedRoutes allowedRole="student" />}>
          <Route path="/studentportal" element={<StudentPortal />}>
            <Route index element={<MyProfile />} />
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="payments" element={<Payments />} />
            <Route path="exam" element={<Exam />} />
            <Route path="coursematerial" element={<CourseMaterial />} />
            <Route path="attendance" element={<Attendance />} />
          </Route>
        </Route>

        {/* Admin Portal Routes with Nested Structure */}
        <Route path="/adminlogin" element={<AdminLogin />}></Route>
        <Route element={<ProtectedRoutes allowedRole="admin" />}>
          <Route path="/adminportal" element={<AdminPage />}>
            <Route index element={<AdminProfile />} />
            <Route path="adminprofile" element={<AdminProfile />} />
            <Route path="professors" element={<Professors />} />
            <Route path="student" element={<Student />} />
            <Route path="admissionrequest" element={<AdmissionsRequest />}></Route>
            <Route path="courses" element={<Courses />} />
            <Route path="circulation" element={<Circulation />} />
          </Route>
        </Route>
      </Routes>
    </div >
  );
}

export default App;