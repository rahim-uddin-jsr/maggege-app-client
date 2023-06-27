import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Componets/Home/Home.jsx";
import Login from "./Componets/Login/Login.jsx";
import Massages from "./Componets/Massages/Massages.jsx";
import Register from "./Componets/Register/Register.jsx";
import AuthProvider from "./Context/AuthProvider/AuthProvider.jsx";
import MassageProvider from "./Context/MassageProvider/MassageProvider.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import "./index.css";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MassageProvider>
          <Home />
        </MassageProvider>
      </ProtectedRoute>
    ),
    children: [{ path: "massages/:id", element: <Massages /> }],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
