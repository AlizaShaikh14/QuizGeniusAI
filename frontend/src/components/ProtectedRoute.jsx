import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  role
}) => {

  const userRole =
    localStorage.getItem(
      "role"
    );

  if (!userRole) {

    return <Navigate to="/" />;
  }

  if (
    role &&
    userRole?.toUpperCase() !==
      role?.toUpperCase()
  ) {

    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;