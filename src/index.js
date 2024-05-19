import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import { BrowserRouter } from "react-router-dom";
import * as signalR from "@aspnet/signalr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`http://localhost:5296/datveHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

const root = ReactDOM.createRoot(document.getElementById("root"));
connection
  .start()
  .then(() => {
    root.render(
      <Provider store={store}>
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}
      </Provider>
    );
  })
  .catch((err) => console.log(err));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
