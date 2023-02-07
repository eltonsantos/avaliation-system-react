import ReactLoading from "react-loading";

import "./styles.css";

export function Loading() {
  return (
    <div className="loading-content">
      <ReactLoading type="spin" color="#21d4fd" />
    </div>
  );
}
