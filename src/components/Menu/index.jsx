import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConfig";

export function Menu() {
  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error.mensage);
      });
  }

  return (
    <ul>
      <li>
        <Link to="/dashboard">Home</Link> |<Link to="/admin">Tokens</Link> |
        <Link to="/collaborators">Adicionar funcionários</Link> |
        <Link to="/services">Adicionar serviços</Link> |
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  );
}
