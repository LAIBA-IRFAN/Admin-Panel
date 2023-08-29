import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import { DarkModeContextProvider } from "./context/darkModeContext";
import { Provider } from "react-redux";
import "./index.css"
import store from "./stateManagement/appStore";

ReactDOM.render(
  
  <Provider store={store}>
    <App />
  </Provider>
,
  document.getElementById("root")
);
