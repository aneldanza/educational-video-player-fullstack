import { createBrowserRouter } from "react-router-dom";
import { App } from "./homepage/App";
import { ErrorPage } from "./ErrorPage";
import { VideoPage } from "./single-video-page/VideoPage";
import { Layout } from "./layout-components/Layout";

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
