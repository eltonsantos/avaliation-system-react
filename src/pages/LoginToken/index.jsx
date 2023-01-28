import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgLogo from "../../assets/small-blue.png";
import "./styles.css";

export function LoginToken() {
  const navigate = useNavigate();
  const [token, setToken] = useState();

  function handleToken() {
    navigate("/");
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form
            className="login100-form validate-form"
            data-bitwarden-watching="1"
            onSubmit={handleToken}
          >
            <span className="login100-form-title p-b-48">
              <i className="zmdi zmdi-font"></i>
              <img src={imgLogo} alt="Imagem" />
            </span>
            <br />

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter token"
            >
              <span className="btn-show-pass">
                <i className="zmdi zmdi-eye"></i>
              </span>
              <input
                className="input100"
                type="password"
                name="token"
                onChange={(e) => setToken(e.target.value)}
                required
              />
              <span
                className="focus-input100"
                data-placeholder="Digite o token recebido"
              ></span>
              <div
                data-lastpass-icon-root="true"
                // style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;"
              ></div>
            </div>
            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button type="submit" className="login100-form-btn">
                  Validar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
