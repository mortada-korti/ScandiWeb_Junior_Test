import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Context
import { DarkModeContextProvider } from "./context/DarkModeContext";

// Style
import "./style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>
);
