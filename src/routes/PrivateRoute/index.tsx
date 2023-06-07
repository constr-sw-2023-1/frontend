import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  // if (!localStorage.getItem("@Auth:user")) {
  //   return <Navigate to={"/app"} replace />;
  // }

  return <Outlet />;
}
