import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConfig";

import imgLogo from "../../assets/small-blue.png";

import "../../styles/global.css";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        const user = useCredential.user;
        navigate("/admin");
        console.log("Sign in successfully");
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form
            className="login100-form validate-form"
            data-bitwarden-watching="1"
            onSubmit={handleLogin}
          >
            <span className="login100-form-title p-b-48">
              <i className="zmdi zmdi-font"></i>
              <img src={imgLogo} alt="Imagem" />
            </span>
            <br />
            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is: a@b.c"
            >
              <input
                className="input100"
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="focus-input100" data-placeholder="Email"></span>
              <div
                data-lastpass-icon-root="true"
                // style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;"
              ></div>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <span className="btn-show-pass">
                <i className="zmdi zmdi-eye"></i>
              </span>
              <input
                className="input100"
                type="password"
                name="pass"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="focus-input100"
                data-placeholder="Password"
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
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
