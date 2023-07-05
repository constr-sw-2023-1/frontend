import Dashboard from "@pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { ResourcesCreate, ResourcesList } from "@pages/Resources";
import PrivateRoute from "./PrivateRoute";
import Lessons from "@pages/Lessons";
import CreateLesson from "@pages/Lessons/CreateLesson";
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
import Rooms from "@pages/PrivatePages/Rooms/RoomsListPages";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={""} element={<PrivateRoute />}>
        <Route path={""} element={<PrivatePages />}>
          {/* <Route path={""} element={<Dashboard />} /> */}
        </Route>
        <Route path="/" element={<Dashboard />} />
        <Route path="lessons" element={<Lessons />} />
        {/*<Route path="lessons/types" element={<Types />} /> */}
        <Route path="/resources" element={<ResourcesList />} />
        <Route path="/resources/create" element={<ResourcesCreate />} />
        <Route path="lessons/create" element={<CreateLesson />} />
        <Route path="/professors" element={<ProfessorList />} />
        <Route path="/professors/create" element={<CreateProfessor />} />
        <Route path="/professors/certificates" element={<Certifications />} />
        <Route path="/professors/certificates/create" element={<CreateCertification />} />
        <Route path="/professors/certificates/:id" element={<CreateCertification />} />
        <Route path="/Turmas" element={<Classes />} />
        <Route path="/Turmas/:id" element={<CreateEdit/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/Periodos" element={<Shifts />} />
        <Route path="/create-shift" element={<CreateShiftsPage name={""} />} />
        <Route path="/edit-shift/:id" element={<CreateShiftsPage name={""} />} />
        <Route path="/Salas" element={<Rooms />} />
      </Route>
    </Routes>
  );
}