import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./styles.css";

const colors = {
  orange: "#ffba5a",
  gray: "#a9a9a9",
};

export function Form() {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [textareaValue, setTextareaValue] = useState("");

  function handleClick(value) {
    setCurrentValue(value);
    console.log(setCurrentValue(value));
  }

  function handleMouseOver(value) {
    setHoverValue(value);
    console.log(setHoverValue(value));
  }

  function handleMouseLeave() {
    setHoverValue(undefined);
    console.log(setHoverValue(undefined));
  }

  function handleResult() {
    console.log(currentValue);
    console.log(textareaValue);
  }

  return (
    <div className="container">
      <form action="">
        <h3>Preencha seus dados</h3>
        Nome: <input type="text" />
        Funcionário: <input type="text" />
        Serviço prestado: <input type="text" />
      </form>

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
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        ></textarea>
      </div>

      <button className="button" onClick={handleResult}>
        Submit
      </button>
    </div>
  );
}
