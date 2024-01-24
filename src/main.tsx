import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import { App } from "./App";
import "./styles/global.css";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <App />

        <Toaster />
      </ApolloProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
