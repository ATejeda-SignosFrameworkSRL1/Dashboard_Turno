import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { Login } from "../Views/login";
import { useSelector } from "react-redux";

export const AppRouter = () => {
  const authenticationState = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return (
    <>
      <Routes>
        {authenticationState ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
