import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivatePages from "@pages/PrivatePages";
import Dashboard from "@pages/PrivatePages/Dashboard";
import Classes from "@pages/PrivatePages/Classes"

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={""} element={<PrivateRoute />}>
        <Route path={""} element={<PrivatePages />}>
          <Route path={"home"} element={<Dashboard />} />
        </Route>
        <Route path="/Turmas" element={<Classes />} />
      </Route>
    </Routes>
  );
}