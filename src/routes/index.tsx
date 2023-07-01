import Dashboard from "@pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivatePages from "@pages/PrivatePages";
import Classes from "@pages/PrivatePages/Classes";
import Certifications from "@pages/PrivatePages/Certifications";
import CreateCertification from "@pages/PrivatePages/Certifications/CreateCertification";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={""} element={<PrivateRoute />}>
        <Route path={""} element={<PrivatePages />}>
          {/* <Route path={""} element={<Dashboard />} /> */}
        </Route>
        <Route path="/Turmas" element={<Classes/>}/>
        <Route path="/certificados" element={<Certifications />} />
        <Route path="/certificados/novo" element={<CreateCertification />} />
        <Route path="/certificados/:id" element={<CreateCertification />} />
      </Route>
    </Routes>
  );
}