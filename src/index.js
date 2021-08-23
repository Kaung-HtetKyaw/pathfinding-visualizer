import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./app/App.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./app/theme";

const RootApp = () => {
  return (
    <div>
      <ColorModeScript initialColorMode="light" />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </div>
  );
};

ReactDOM.render(<RootApp />, document.getElementById("root"));
