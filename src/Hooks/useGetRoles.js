import useAuth from "./useAuth";
import jwt_decode from "jwt-decode";

const useGetRoles = () => {
    const { auth } = useAuth();

    const verifyRoles = (list) => {
        console.log(list);
        const decoded = auth?.accessToken
            ? jwt_decode(auth.accessToken)
            : undefined;

        const roles = decoded?.UserInfo?.roles || [];

        return roles.find((role) => list?.includes(role)) ? true : false;
    };
    return { verifyRoles };
};

export default useGetRoles;
