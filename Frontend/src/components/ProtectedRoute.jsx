import { Navigate } from "react-router-dom";
import { getSession } from "@/lib/store";

const ProtectedRoute = ({ children, role }) => {
  const session = getSession();

  if (!session || session.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;