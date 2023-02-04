import { useParams } from "react-router-dom";
import imgLogo from "../../assets/small-blue.png";
import { Form } from "../../components/Form";
import { useToken } from "../../hooks/useToken";
import "./styles.css";

export function Rating() {
  const { token } = useToken();

  console.log(token);

  let { id } = useParams();

  return (
    <div className="containerRating">
      <span className="login100-form-title p-b-48">
        <i className="zmdi zmdi-font"></i>
        <img src={imgLogo} alt="Imagem" />
      </span>
      Param: {id}
      <Form />
    </div>
  );
}
