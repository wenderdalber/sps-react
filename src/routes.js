import { createBrowserRouter, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import UserEdit, { userLoader } from "./pages/UserEdit";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/users",
    element: <PrivateRoute><Users /></PrivateRoute>,
  },
  {
    path: "/users/:userId",
    element: <PrivateRoute><UserEdit /></PrivateRoute>,
    loader: userLoader,
  },
]);

export default router;