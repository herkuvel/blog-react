// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SmoothScroll from "./components/SmoothScroll";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/blog.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <BrowserRouter>
    <SmoothScroll>
      <Provider>
        <App />
      </Provider>
    </SmoothScroll>
  </BrowserRouter>

  // </React.StrictMode>
);
