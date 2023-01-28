import imgLogo from "../../assets/small-blue.png";
import "./styles.css";

export function Thanks() {
  return (
    <div className="containerThanks">
      <div className="contentThanks">
        <img src={imgLogo} alt="Imagem" />
        <h2>Obrigado pela avaliação</h2>
        <p>Nossa equipe agradece!</p>
      </div>
    </div>
  );
}
