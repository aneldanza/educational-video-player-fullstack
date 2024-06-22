import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ErrorPage } from "./ErrorPage";
import { VideoPage } from "./VideoPage";
import { Layout } from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <App />, errorElement: <ErrorPage />},
      { path: "/videos/:videoId", element: <VideoPage /> },
    ],
  },
]);
