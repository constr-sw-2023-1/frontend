import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ReservationList from "@pages/ReservationList";
import ReservationEditor from "@pages/ReservationEditor";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/" element={<ReservationList />} />
        <Route path="/editor/*" element={<ReservationEditor />} />
      </Route>
    </Routes>
  );
}
