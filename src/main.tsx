import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./contexts/auth-context";
import { client } from "./lib/apollo";
import { App } from "./app";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <App />
        <Toaster />
      </ApolloProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
