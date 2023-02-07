import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { TokenContext } from "../contexts/TokenProvider";
import { NotFound } from "../pages/NotFound";

export function TokenRoutes() {
  const { token } = useContext(TokenContext);
  console.log("Token é: " + token);
  return token ? <Outlet /> : <NotFound />;
}
