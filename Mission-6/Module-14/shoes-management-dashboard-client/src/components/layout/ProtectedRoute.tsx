import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { TUser, logout, selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRouteProps = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};
export default ProtectedRoute;
