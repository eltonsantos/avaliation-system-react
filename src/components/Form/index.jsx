import { collection } from "firebase/firestore";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { db } from "../../services/firebaseConfig";
import "./styles.css";

const colors = {
  orange: "#ffba5a",
  gray: "#a9a9a9",
};

export function Form() {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState("");

  const answersCollectionRef = collection(db, "answers");

  function handleClick(value) {
    setCurrentValue(value);
  }

  function handleMouseOver(value) {
    setHoverValue(value);
  }

  function handleMouseLeave() {
    setHoverValue(undefined);
  }

  function handleResult() {
    console.log(currentValue);
    console.log(textareaValue);
  }

  return (
    <div className="container">
      <form id="form-rating" onSubmit={handleResult}>
        <h3>Preencha seus dados</h3>

        <div className="form-control">
          <label htmlFor="name">Nome:</label>
          <input type="text" placeholder="Nome" id="name" />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>

        <div className="form-control">
          <label htmlFor="service">Serviço:</label>
          <input type="text" placeholder="Serviço" id="service" />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>

        <div className="form-control">
          <label htmlFor="collaborator">Funcionário:</label>
          <select name="select">
            <option value="valor1">Valor 1</option>
            <option value="valor2">Valor 2</option>
            <option value="valor3">Valor 3</option>
          </select>
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error message</small>
        </div>

        <div className="stars">
          <h2>A comunicação entre você e o funcionário foi rápida?</h2>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                style={{ marginRight: 10, cursor: "pointer" }}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.gray
                }
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                value={currentValue}
                onChange={(e) => setcurrentValue(e.target.value)}
              />
            );
          })}
        </div>

        <div className="stars">
          <h2>Foi de fácil entendimento?</h2>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                style={{ marginRight: 10, cursor: "pointer" }}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.gray
                }
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                value={currentValue}
                onChange={(e) => setcurrentValue(e.target.value)}
              />
            );
          })}
        </div>

        <div className="stars">
          <h2>Gostou do serviço prestado?</h2>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                style={{ marginRight: 10, cursor: "pointer" }}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.gray
                }
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                value={currentValue}
                onChange={(e) => setcurrentValue(e.target.value)}
              />
            );
          })}
        </div>

        <div className="stars">
          <h2>Recomendaria o serviço para alguém?</h2>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                style={{ marginRight: 10, cursor: "pointer" }}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.gray
                }
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                value={currentValue}
                onChange={(e) => setcurrentValue(e.target.value)}
              />
            );
          })}
        </div>

        <div className="stars">
          <h2>Comentário, sugestão ou crítica:</h2>

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="textarea"
            value={comment}
            onChange={(e) => setTextareaValue(e.target.value)}
          ></textarea>
        </div>
        <button className="submit">Submit</button>
      </form>
    </div>
  );
}
