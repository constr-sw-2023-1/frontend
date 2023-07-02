import Dashboard from "@pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivatePages from "@pages/PrivatePages";
import CreateShiftsPage from "@pages/PrivatePages/Shifts/CreateShiftsPage";
import Shifts from "@pages/PrivatePages/Shifts/ShiftsPage";
//import Classes from "@pages/PrivatePages/Classes";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={""} element={<PrivateRoute />}>
        <Route path={""} element={<PrivatePages />}>
          {/* <Route path={""} element={<Dashboard />} /> */}
        </Route>
        {/*         <Route path="/Turmas" element={<Classes/>}/>
 */}       <Route path="/Periodos" element={<Shifts />} />
        <Route path="/create-shift" element={<CreateShiftsPage name={""} />} />
        <Route path="/edit-shift/:id" element={<CreateShiftsPage name={""} />} />
      </Route>
    </Routes>
  );
}