import Dashboard from "@pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Lessons from "@pages/Lessons";
import Types from "@pages/Lessons/types";
import CreateLesson from "@pages/Lessons/CreateLesson";
import ProfessorList from "@pages/Professors";
import CreateProfessor from "@pages/Professors/CreateProfessor";
import PrivatePages from "@pages/PrivatePages";
import Classes from "@pages/PrivatePages/Classes"
import Login from "@pages/Login";

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
        <Route path="/professors/create" element={<CreateProfessor />} />
        <Route path="/Turmas" element={<Classes/>}/>
        <Route path="/login" element={<Login/>}/>
      </Route>
    </Routes>
  );
}