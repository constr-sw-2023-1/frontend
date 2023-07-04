import Dashboard from "@pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Lessons from "@pages/Lessons";
import Types from "@pages/Lessons/Types";
import CreateLesson from "@pages/Lessons/CreateLesson";
import CreateProfessor from "@pages/PrivatePages/Professors/CreateProfessor";
import PrivatePages from "@pages/PrivatePages";
import CreateShiftsPage from "@pages/PrivatePages/Shifts/CreateShiftsPage";
import Shifts from "@pages/PrivatePages/Shifts/ShiftsPage";
import Certifications from "@pages/PrivatePages/Certifications";
import CreateCertification from "@pages/PrivatePages/Certifications/CreateCertification";
import Classes from "@pages/PrivatePages/Classes"
import CreateEdit from "@pages/PrivatePages/Classes/CreateEdit/CreateEdit"
import Login from "@pages/Login";
import ProfessorList from "@pages/PrivatePages/Professors";
import EditProfessors from "@pages/PrivatePages/Professors/EditProfessor";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={""} element={<PrivateRoute />}>
        <Route path={""} element={<PrivatePages />}>
          {/* <Route path={""} element={<Dashboard />} /> */}
        </Route>
        <Route path="/" element={<Dashboard />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="lessons/types" element={<Types />} />
        <Route path="lessons/create" element={<CreateLesson />} />
        <Route path="/professors" element={<ProfessorList />} />
        <Route path="/professors/:id" element={<EditProfessors />} />
        <Route path="/professors/create" element={<CreateProfessor />} />
        <Route path="/Turmas" element={<Classes />} />
        <Route path="/Turmas/:id" element={<CreateEdit/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/Periodos" element={<Shifts />} />
        <Route path="/create-shift" element={<CreateShiftsPage name={""} />} />
        <Route path="/edit-shift/:id" element={<CreateShiftsPage name={""} />} />
        <Route path="/professors/certifications" element={<Certifications />} />
        <Route path="/professors/certifications/create" element={<CreateCertification />} />
        <Route path="/professors/certifications/:id" element={<CreateCertification />} />
        <Route path={""} element={<Dashboard />} />
      </Route>
    </Routes>
  );
}