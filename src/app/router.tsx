import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import AppLayout from "./layout/AppLayout";

export const router = createBrowserRouter([
  // PUBLIC
  { path: "/login", element: <LoginPage /> },

  // PRIVATE (na razie jeszcze bez guarda - dodamy w kolejnym kroku)
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <div>HOME – ROUTER DZIALA</div> },
      { path: "words", element: <div>Words</div> },
      { path: "training", element: <div>Training</div> },
      { path: "stats", element: <div>Stats</div> },
    ],
  },
]);
