import Dashboard from "@pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { ResourcesEdit, ResourcesCreate, ResourcesList } from "@pages/PrivatePages/Resources";
import PrivateRoute from "./PrivateRoute";
import Lessons from "@pages/Lessons";
import CreateLesson from "@pages/Lessons/CreateLesson";
import CreateEditLesson from '@pages/PrivatePages/Lessons/CreateEditLesson';
import CreateEditSubject from '@pages/PrivatePages/Lessons/CreateEditSubject';
import CreateEditType from '@pages/PrivatePages/Lessons/CreateEditType';
import Subjects from '@pages/PrivatePages/Lessons/Subjects';
import Types from '@pages/PrivatePages/Lessons/Types';
import ProfessorList from "@pages/PrivatePages/Professors";
import CreateProfessor from "@pages/PrivatePages/Professors/CreateProfessor";
import PrivatePages from "@pages/PrivatePages";
import CreateShiftsPage from "@pages/PrivatePages/Shifts/CreateShiftsPage";
import Shifts from "@pages/PrivatePages/Shifts/ShiftsPage";
import Certifications from "@pages/PrivatePages/Certifications";
import CreateCertification from "@pages/PrivatePages/Certifications/CreateCertification";
import Classes from "@pages/PrivatePages/Classes"
import CreateEdit from "@pages/PrivatePages/Classes/CreateEdit/CreateEdit"
import Login from "@pages/Login";
import Students from "@pages/students";
import CreateStudent from "@pages/students/CreateStudent";
import EditStudent from "@pages/students/EditStudent";
import EditProfessors from '@pages/PrivatePages/Professors/EditProfessor';

export default function RoutesComponent() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="/resources" element={<ResourcesList />} />
        <Route path="/resources/edit/:id" element={<ResourcesEdit />} />
        <Route path="/resources/create" element={<ResourcesCreate />} />
        <Route path="/Turmas" element={<Classes />} />
        <Route path="/Turmas/:id" element={<CreateEdit/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/create-shift" element={<CreateShiftsPage name={""} />} />
        <Route path="/edit-shift/:id" element={<CreateShiftsPage name={""} />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/create" element={<CreateEditLesson />} />
        <Route path="/lessons/edit/:id" element={<CreateEditLesson />} />
        <Route path="/lessons/subjects" element={<Subjects />} />
        <Route path="/lessons/subjects/create" element={<CreateEditSubject />} />
        <Route path="/lessons/subjects/edit/:id" element={<CreateEditSubject />} />
        <Route path="/lessons/types" element={<Types />} />
        <Route path="/lessons/types/create" element={<CreateEditType />} />
        <Route path="/lessons/types/edit/:id" element={<CreateEditType />} />
        <Route path="/Periodos" element={<Shifts />} />
        <Route path="/professors" element={<ProfessorList />} />
        <Route path="/professors/:id" element={<EditProfessors />} />
        <Route path="/professors/certifications" element={<Certifications />} />
        <Route path="/professors/certifications/:id" element={<CreateCertification />} />
        <Route path="/professors/certifications/create" element={<CreateCertification />} />
        <Route path="/professors/create" element={<CreateProfessor />} />
        <Route path={"/students"} element={<Students />} />
        <Route path={"students/create"} element={<CreateStudent />} />
        <Route path={"students/edit/:id"} element={<EditStudent />} />
      <Route path={""} element={<PrivateRoute />}>
      </Route>
    </Routes>
  );
}
