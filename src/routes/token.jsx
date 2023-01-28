import { Navigate, Outlet } from "react-router-dom";

export function TokenRoutes() {
  let auth = { token: true };

  return auth.token ? <Outlet /> : <Navigate to="/token" />;
}
