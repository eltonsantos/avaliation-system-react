import imgLogo from "../../assets/small-blue.png";
import { Form } from "../../components/Form";
import "./styles.css";

export function Rating() {
  return (
    <div className="containerRating">
      <span className="login100-form-title p-b-48">
        <i className="zmdi zmdi-font"></i>
        <img src={imgLogo} alt="Imagem" />
      </span>
      <Form />
    </div>
  );
}
