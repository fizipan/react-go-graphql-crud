import { Cookie } from "@/utils/storage";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = Cookie.getAccessToken();

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
