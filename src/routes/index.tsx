import Dashboard from "@pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivatePages from "@pages/PrivatePages";
import ClassesListPage from "@pages/RoomsListPage";
// import Classes from "@pages/PrivatePages/Classes"

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={""} element={<PrivateRoute />}>
        <Route path={""} element={<PrivatePages />}>
          {/* <Route path={""} element={<Dashboard />} /> */}
        </Route>
        {/* <Route path="/Turmas" element={<Classes/>}/> */}
        <Route path="/salas" element={<ClassesListPage/>}/>
      </Route>
    </Routes>
  );
}