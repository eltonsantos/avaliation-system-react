import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Collaborator } from "./pages/Collaborator";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Rating } from "./pages/Rating";
import { Service } from "./pages/Service";
import { Thanks } from "./pages/Thanks";
import { PrivateRoutes, TokenRoutes } from "./routes";

import "./styles/global.css";

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Admin />} path="/admin" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Collaborator />} path="/collaborators" />
          <Route element={<Service />} path="/services" />
        </Route>

        <Route para element={<TokenRoutes />}>
          <Route element={<Rating />} path="/avaliacao/:token" />
          <Route element={<Thanks />} path="/thanks" />
          <Route element={<NotFound />} path="*" />
        </Route>

        <Route element={<Login />} path="/" />
      </Routes>
    </Router>
  );
}
