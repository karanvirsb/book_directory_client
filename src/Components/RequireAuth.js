import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined;

    const roles = decoded?.UserInfo?.roles || [];
    console.log(roles.find((role) => allowedRoles?.includes(role)));
    return roles.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet></Outlet>
    ) : auth?.user ? (
        <Navigate
            to='/unauthorized'
            state={{ from: location }}
            replace
        ></Navigate>
    ) : (
        <Navigate to='/login' state={{ from: location }} replace></Navigate>
    );
};

export default RequireAuth;
