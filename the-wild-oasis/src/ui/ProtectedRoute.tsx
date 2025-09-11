import { ReactNode } from "react";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // 1. Load the authenticated user
  const { user, isLoading, isAuthenticated } = useUser();

  // 2. While loading, show a spinner

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 3. If there is NO authenticates user, redirect to the /login

  if (!isAuthenticated && !isLoading) return <Navigate to="/login" />;
  // 4. If there IS  a user, render the app
  return children;
};

export default ProtectedRoute;
