import { ReactNode, useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthcontext";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode | ReactNode[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return children;
};
