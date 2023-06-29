import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivatePages from "@pages/PrivatePages";
import CoursesListPage from "@pages/PrivatePages/Courses/CoursesListPage";
import AddCoursePage from "@pages/PrivatePages/Courses/AddCoursePage";
import CourseDetailsPage from "@pages/PrivatePages/Courses/CourseDetailsPage";
import AddBookPage from "@pages/PrivatePages/Courses/AddBookPage";
import BookDetailsPage from "@pages/PrivatePages/Courses/BookDetailsPage";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={"app"} element={<PrivateRoute />}>
        <Route path={""} element={<PrivatePages />}>
          <Route path={"courses"} element={<CoursesListPage />} />
          <Route path={"courses/add"} element={<AddCoursePage />} />
          <Route path={"courses/details/:id"} element={<CourseDetailsPage />} />
          <Route path={"books/add"} element={<AddBookPage />} />
          <Route path={"books/details/:id"} element={<BookDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}