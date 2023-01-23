import { Link } from "react-router-dom";

export function Menu() {
  return (
    <ul>
      <li>
        <Link to="/admin">Home</Link>
        <Link to="/collaborator">Add Collaborator</Link>
        <Link to="/">Logout</Link>
      </li>
    </ul>
  );
}
