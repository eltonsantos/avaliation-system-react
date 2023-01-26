import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Collaborator } from "./pages/Collaborator";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { PrivateRoutes } from "./routes";

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Admin />} path="/admin" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Collaborator />} path="/collaborator" />
        </Route>

        <Route element={<Login />} path="/" />
      </Routes>
    </Router>
  );
}
