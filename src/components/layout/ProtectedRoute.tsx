import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TUser, logOut, selectCurrentUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";


export type TProtectedRoute = {
  children:ReactNode;
  role:string | undefined;
}

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  // const {token} = useAppSelector((state)=>state.auth)
  const token = useAppSelector(useCurrentToken);
  let user;

  if(token){
    user = verifyToken(token);
  }
  
  const dispatch = useAppDispatch();
  const location = useLocation();
  if(role !== undefined && role !== (user as TUser)?.role){
    dispatch(logOut());
     return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;