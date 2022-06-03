import { useContext } from "react";
import AuthContext from "../Context/AuthProvider";
// we can eliminate steps from use auth without importing every single time
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
