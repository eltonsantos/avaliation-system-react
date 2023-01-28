import { useNavigate } from "react-router-dom";
import "./styles.css";

export function LoginToken() {
  const navigate = useNavigate();

  function handleToken() {
    navigate("/");
  }

  return (
    <div className="container">
      <h2>Página de login do token</h2>
      <form onSubmit={handleToken}>
        <input type="text" placeholder="Digite o token recebido" />
        <button type="submit">Validar</button>
      </form>
    </div>
  );
}
