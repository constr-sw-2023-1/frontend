import { Route, Routes } from "react-router-dom";
import Resources from "@pages/Resources";
import PrivateRoute from "./PrivateRoute";
import Classes from '@pages/PrivatePages'

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={""} element={<PrivateRoute />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/Turmas" element={<Classes />} />
    </Routes>
  );
}