import { useContext } from "react";
import { Navigate } from "react-router-dom";
import OnProcessing from "../Componets/OnProcessing/OnProcessing";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <OnProcessing />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
