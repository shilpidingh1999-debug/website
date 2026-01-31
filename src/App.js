import { Routes, Route } from "react-router-dom";

import { StudentProvider } from "./StudentContext";

import { TeacherProvider } from "./TeacherContext";
import { AttendanceProvider } from "./AttendanceContext";
import { ClassProvider } from "./ClassContext";
import { FeesProvider } from "./FeesContext";
import { AuthProvider } from "./AuthContext";
import AdmissionForm from "./AdmissionForm";
import PublicLayout from "./PublicLayout";
import AdminLayout from "./AdminLayout";
 import AdmissionSuccess from "./AdmissionSuccess";
 import AdminAdmissions from "./AdminAdmissions";
 import AdminProfile from "./AdminProfile";


import Home from "./Home";
import About from "./About";
import Login from "./Login";

import SDashboard from "./Student/SDashboard";
import SProfile from "./Student/SProfile";
import SFees from "./Student/SFees";
import SAttendance from "./Student/SAttendance";

import Dashboard from "./Dashboard";
import Students from "./Students";
import Teacher from "./Teacher";
import Classes from "./Classes";
import Subjects from "./Subjects";
import Attendances from "./Attendances";
import Fees from "./Fees";

import StudentProtectedRoute from "./Student/StudentProtectedRoute";
import { SubjectProvider } from "./SubjectContext";
import { AdminProvider } from "./AdminContext";

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
      <FeesProvider>
      <StudentProvider>
        <TeacherProvider>
          <AttendanceProvider>
            <ClassProvider>
              
                <SubjectProvider>

                <Routes>

                 
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin/login" element={<Login />} />
                     <Route path="/admissionform" element={<AdmissionForm />} />
                    <Route path="/admission-success" element={<AdmissionSuccess />} />

                  </Route>

                 
                  <Route element={<StudentProtectedRoute />}>
                    <Route path="/student" element={<SDashboard />}>
                      <Route index element={<SProfile />} />
                      <Route path="profile" element={<SProfile />} />
                      <Route path="fees" element={<SFees />} />
                      <Route path="attendance" element={<SAttendance />} />
                    </Route>
                  </Route>

                  
                  
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<AdminProfile />} /> 
                    <Route path="students" element={<Students />} />
                     <Route path="admissionform" element={<AdmissionForm />} />
                     <Route path="admissions" element={<AdminAdmissions />} />
                    <Route path="teacher" element={<Teacher />} />
                    <Route path="classes" element={<Classes />} />
                    <Route path="attendances" element={<Attendances />} />
                    <Route path="fees" element={<Fees />} />
                    <Route path="subjects" element={<Subjects/>} />
                  </Route> 

                </Routes>
                  
                 </SubjectProvider>
             
            </ClassProvider>
          </AttendanceProvider>
        </TeacherProvider>
      </StudentProvider>
       </FeesProvider>
     </AdminProvider>
    </AuthProvider>
  );
}

export default App;
