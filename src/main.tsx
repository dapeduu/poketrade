import { Global } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import App from "./App";
import { queryClient } from "./config/reactQuery";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Global
        styles={{
          "*": {
            margin: "0",
            padding: "0",
            boxSizing: "border-box",
          },
        }}
      />
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
