import Dashboard from "@pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Subjects from "@pages/Lessons";
import Types from "@pages/Lessons/Types";
import CreateLesson from "@pages/Lessons/CreateLesson";
import CreateSubject from "@pages/Lessons/CreateSubject";
import Lessons from "@pages/Lessons/Lessons";
import CreateType from "@pages/Lessons/CreateType";
import EditSubject from "@pages/Lessons/EditSubject";
import EditType from "@pages/Lessons/EditType";
import EditLesson from "@pages/Lessons/EditLesson";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="subjects/lessons" element={<Lessons />} />
        <Route path="subjects/types" element={<Types />} />
        <Route path="subjects/types/create" element={<CreateType />} />
        <Route path="subjects/lessons/create" element={<CreateLesson />} />
        <Route path="subjects/create" element={<CreateSubject />} />
        <Route path="/subjects/edit/:id" element={<EditSubject />} />
        <Route path="/subjects/types/edit/:id" element={<EditType />} />
        <Route path="/subjects/lessons/edit/:id" element={<EditLesson />} />
      </Route>
    </Routes>
  );
}
