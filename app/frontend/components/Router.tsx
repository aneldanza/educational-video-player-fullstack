import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ErrorPage } from "./ErrorPage";
import { VideoPage } from "./VideoPage";

export const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  {path: "/videos/:videoId", element: <VideoPage />}
]);
