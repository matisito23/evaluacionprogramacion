import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // IMPORTANTE: importá Bootstrap aquí

import "./index.css";  // Tu CSS si tienes

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("No se encontró el elemento root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
