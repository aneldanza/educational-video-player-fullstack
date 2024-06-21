import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ErrorPage } from "./ErrorPage";
import { Video } from "./Video";

export const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  {path: "/videos/:videoId", element: <Video />}
]);
