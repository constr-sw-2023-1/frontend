import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// import PrivatePages from "@pages/PrivatePages";
import CoursesListPage from "@pages/PrivatePages/Courses/CoursesListPage";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={"app"} element={<PrivateRoute />}>
        <Route path={"courses/list"} element={<CoursesListPage />} />
        {/* <Route path={""} element={<PrivatePages />}>
        </Route> */}
      </Route>
    </Routes>
  );
}