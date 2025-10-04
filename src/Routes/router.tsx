import { createBrowserRouter } from "react-router";
import App from "../App";
import Tasks from "../components/tasks/Tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Tasks />,
      },
    ],
  },
]);

export default router;
