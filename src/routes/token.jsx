import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "../hooks/useToken";

export function TokenRoutes() {
  const { token } = useToken();

  console.log(token);

  return token != "undefined" ? <Outlet /> : <Navigate to="/notfound" />;
}
