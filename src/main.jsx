import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { App } from "./App";

import "react-toastify/dist/ReactToastify.css";
import { TokenProvider } from "./hooks/useToken";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TokenProvider>
      <App />
      <ToastContainer />
    </TokenProvider>
  </React.StrictMode>
);
