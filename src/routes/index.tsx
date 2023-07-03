import Dashboard from '@pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Subjects from '@pages/PrivatePages/Lessons/Subjects';
import Types from '@pages/PrivatePages/Lessons/Types';
import Lessons from '@pages/PrivatePages/Lessons';
import CreateEditSubject from '@pages/PrivatePages/Lessons/CreateEditSubject';
import CreateEditType from '@pages/PrivatePages/Lessons/CreateEditType';
import CreateEditLesson from '@pages/PrivatePages/Lessons/CreateEditLesson';

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lessons/subjects" element={<Subjects />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/types" element={<Types />} />
        <Route path="/lessons/types/create" element={<CreateEditType />} />
        <Route path="/lessons/create" element={<CreateEditLesson />} />
        <Route
          path="/lessons/subjects/create"
          element={<CreateEditSubject />}
        />
        <Route
          path="/lessons/subjects/edit/:id"
          element={<CreateEditSubject />}
        />
        <Route path="/lessons/types/edit/:id" element={<CreateEditType />} />
        <Route path="/lessons/edit/:id" element={<CreateEditLesson />} />
      </Route>
    </Routes>
  );
}
