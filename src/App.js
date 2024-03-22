import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Components/SignUp";
import MessageComponent from "./Components/message";
import Login from "./Components/Login";
import Admin from "./Components/admin";
import Instructor from "./Components/instructor";
import QAOrganizer from "./Components/QAOrganizer";
import ProgramCoordinator from "./Components/pc";
import EditProfile from "./Components/EditProfile";
import Student from "./Components/Student";
import AddCourses from "./Components/addCourses";
import EditCourse from "./Components/editCourse";
import AddProgram from "./Components/addProgram";
import EditProgram from "./Components/editProgram";
import EditUser from "./Components/editUser";
import AddUser from "./Components/addUser";
import Reports from "./Components/reports";
import Assessment from "./Components/assessment";
import EditQuiz from "./Components/editQuiz";
import EditGrade from "./Components/editGrade";
import AddPCProgram from "./Components/addPCProgram";
import EditPC from "./Components/editpc";
import EditQA from "./Components/editQA";
import AddQA from "./Components/addQA";
import EnrollCourses from "./Components/enrollCourses";
import EnrollProgram from "./Components/enrollP";
import PCReport from "./Components/pcReports";
import ForgetPassword from "./Components/forgetPassword";
import VerifyNumber from "./Components/verifyNumber";
import AiBot from "./Components/aiBot";
import UpdatePassword from "./Components/updatePassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="aiBot" element={<AiBot />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route path="verifyNumber" element={<VerifyNumber />} />
          <Route path="updatePassword" element={<UpdatePassword />} />
          <Route path="admin" element={<Admin />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="QAOrganizer" element={<QAOrganizer />} />
          <Route path="pc" element={<ProgramCoordinator />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path="student" element={<Student />} />
          <Route path="addCourses" element={<AddCourses />} />
          <Route path="editCourse" element={<EditCourse />} />
          <Route path="addProgram" element={<AddProgram />} />
          <Route path="editProgram" element={<EditProgram />} />
          <Route path="editUser" element={<EditUser />} />
          <Route path="addUser" element={<AddUser />} />
          <Route path="reports" element={<Reports />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="editQuiz" element={<EditQuiz />} />
          <Route path="editGrade" element={<EditGrade />} />
          <Route path="messageChat" element={<MessageComponent />} />
          <Route path="addpc" element={<AddPCProgram />} />
          <Route path="editpc" element={<EditPC />} />
          <Route path="editQA" element={<EditQA />} />
          <Route path="addQA" element={<AddQA />} />
          <Route path="enrollC" element={<EnrollCourses />} />
          <Route path="enrollPrograms" element={<EnrollProgram />} />
          <Route path="pcreports" element={<PCReport />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
