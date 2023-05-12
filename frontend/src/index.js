import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { ChakraProvider } from "@chakra-ui/react";
import { InstituteProvider } from "./Content/InstituteContext";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE,
};
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <InstituteProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </AlertProvider>
      </InstituteProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
