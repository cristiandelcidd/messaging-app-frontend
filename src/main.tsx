import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";

import { AuthState } from "./context/auth/AuthState";
import { initialState } from "./context/auth/AuthContext";
import reducer from "./context/auth/AuthReducer";

render(
  <React.StrictMode>
    <AuthState initialState={initialState} reducer={reducer}>
      <App />
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);
