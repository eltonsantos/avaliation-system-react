import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import { Rating } from "../pages/Rating";

export function TokenRoutes() {
  const { token } = useToken();

  let { xxx } = useParams();

  console.log(xxx);

  return xxx != "undefined" ? (
    <Routes>
      <Route element={<Rating />} path="/" />
    </Routes>
  ) : (
    <Navigate to="/notfound" />
  );
}
