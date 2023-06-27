import Dashboard from "@pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivatePages from "@pages/PrivatePages";
import Classes from "@pages/PrivatePages/Classes"
import CreateEdit from "@pages/PrivatePages/Classes/CreateEdit/CreateEdit"

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={""} element={<PrivateRoute />}>
        <Route path={""} element={<PrivatePages />}>
          {/* <Route path={""} element={<Dashboard />} /> */}
        </Route>
        <Route path="/Turmas" element={<Classes/>}/>
        <Route path="/Turmas/:id" element={<CreateEdit/>}/>
      </Route>
    </Routes>
  );
}