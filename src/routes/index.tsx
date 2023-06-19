import Dashboard from "@pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Lessons from "@pages/Lessons";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={""} element={<PrivateRoute />}>
        <Route path={""} element={<Dashboard />} />
        <Route path="lessons" element={<Lessons />} />
      </Route>
    </Routes>
  );
}
