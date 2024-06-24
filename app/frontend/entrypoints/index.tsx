import React from "react";
import ReactDOM from "react-dom/client";
import "virtual:windi.css";
import { store } from "../app/store.ts";
import { Provider } from "react-redux";
import { router } from "../components/Router.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
