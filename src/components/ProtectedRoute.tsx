import { PropsWithChildren, useEffect, useState } from "react";
import { LoginProps } from "../types/types";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props: PropsWithChildren<LoginProps>) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await fetch('/api/user/role', {
          method: 'GET',
        });
        const roleString = await response.json();

        if (roleString !== props.roleRequired) {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, [props.roleRequired]);

  if (isAuthorized === null) {
    // You can return a loading indicator here while waiting for the authorization check
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/error" replace />;
  }

  return <>{props.children}</>;
};
