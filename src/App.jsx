import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Collaborator } from "./pages/Collaborator";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Rating } from "./pages/Rating";
import { Thanks } from "./pages/Thanks";
import { PrivateRoutes } from "./routes";

import "./styles/global.css";

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Admin />} path="/admin" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Collaborator />} path="/collaborator" />
        </Route>

        <Route element={<Rating />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Thanks />} path="/thanks" />
      </Routes>
    </Router>
  );
}
