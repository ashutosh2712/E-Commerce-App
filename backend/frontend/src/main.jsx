import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalOptions = {
  "client-id":
    "Ac6VfanBNvdF15FdCwcI4TMRd1E3YNdsPr5S9qWPIyykvCWnC1_wKY_bChE2ofcwJy8sSKQBU9r8IESh",
  currency: "USD",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider options={paypalOptions}>
      <App />
    </PayPalScriptProvider>
  </Provider>
);
