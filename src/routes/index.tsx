import Dashboard from '@pages/Dashboard';
import CreateLesson from '@pages/Lessons/CreateLesson';
import Login from '@pages/Login';
import PrivatePages from '@pages/PrivatePages';
import Certifications from '@pages/PrivatePages/Certifications';
import CreateCertification from '@pages/PrivatePages/Certifications/CreateCertification';
import Classes from '@pages/PrivatePages/Classes';
import Lessons from '@pages/PrivatePages/Lessons';
import CreateEditLesson from '@pages/PrivatePages/Lessons/CreateEditLesson';
import CreateEditSubject from '@pages/PrivatePages/Lessons/CreateEditSubject';
import CreateEditType from '@pages/PrivatePages/Lessons/CreateEditType';
import Subjects from '@pages/PrivatePages/Lessons/Subjects';
import Types from '@pages/PrivatePages/Lessons/Types';
import ProfessorList from '@pages/PrivatePages/Professors';
import CreateProfessor from '@pages/PrivatePages/Professors/CreateProfessor';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={''} element={<PrivateRoute />}>
        <Route path={''} element={<PrivatePages />}>
          {/* <Route path={""} element={<Dashboard />} /> */}
        </Route>
        <Route path="/" element={<Dashboard />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="lessons/types" element={<Types />} />
        <Route path="lessons/create" element={<CreateLesson />} />
        <Route path="/professors" element={<ProfessorList />} />
        <Route path="/professors/create" element={<CreateProfessor />} />
        <Route path="/professors/certificates" element={<Certifications />} />
        <Route
          path="/professors/certificates/create"
          element={<CreateCertification />}
        />
        <Route
          path="/professors/certificates/:id"
          element={<CreateCertification />}
        />
        <Route path="/Turmas" element={<Classes />} />
        <Route path="/login" element={<Login />} />
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
