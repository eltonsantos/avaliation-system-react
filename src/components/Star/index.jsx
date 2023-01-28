import { useState } from "react";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#ffba5a",
  gray: "#a9a9a9",
};

export function Star({ value, onRatingChanged }) {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  function handleClick(value) {
    setCurrentValue(value);
    onRatingChanged(value);
  }

  function handleMouseOver(value) {
    setHoverValue(value);
  }

  function handleMouseLeave() {
    setHoverValue(undefined);
  }

  return (
    <>
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={24}
            style={{ marginRight: 10, cursor: "pointer" }}
            color={
              (hoverValue || currentValue) > index ? colors.orange : colors.gray
            }
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            currentvalue={value}
          />
        );
      })}
    </>
  );
}
