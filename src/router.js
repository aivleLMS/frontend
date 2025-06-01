import { createBrowserRouter } from "react-router-dom";
import RegisterBook from "./pages/RegisterBook";
import EditBook from "./pages/EditBook";

const router = createBrowserRouter([
  {
    id: 0,
    path: "",
    element: <RegisterBook />,
  },
  {
    id: 1,
    path: "",
    element: <EditBook />,
  },
]);

export default router;
