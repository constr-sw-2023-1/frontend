import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivatePages from "@pages/PrivatePages";
import CoursesListPage from "@pages/PrivatePages/Courses/CoursesListPage";
import AddCoursePage from "@pages/PrivatePages/Courses/AddCoursePage";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={"app"} element={<PrivateRoute />}>
        <Route path={""} element={<PrivatePages />}>
          <Route path={"courses"} element={<CoursesListPage />} />
          <Route path={"courses/add"} element={<AddCoursePage />} />
        </Route>
      </Route>
    </Routes>
  );
}