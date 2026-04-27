import type { RouteObject } from "react-router-dom";
import { Home, NotFound } from "../core";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
