import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoutes() {
  const auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
}
