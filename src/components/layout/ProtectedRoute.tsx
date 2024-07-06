import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({children}:{children:ReactNode}) => {
    // const {token} = useAppSelector((state)=>state.auth)
    const token = useAppSelector(selectCurrentUser);
     const location = useLocation();
     if (!token) {
       return <Navigate to="/login" state={{ from: location }} replace />;
     }


return children;
};

export default ProtectedRoute;