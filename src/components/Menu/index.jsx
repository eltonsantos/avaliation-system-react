import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConfig";

export function Menu() {
  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error.mensage);
      });
  }

  return (
    <ul>
      <li>
        <Link to="/admin">Home</Link> |<Link to="/dashboard">Dashboard</Link> |
        <Link to="/collaborator">Add Collaborator</Link> |
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  );
}
