import axios from "../Api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({}); // want to empty out
        try {
            await axios("/logout", {
                withCredentials: true,
            });
        } catch (err) {
            // console.log(err);
        }
    };
    return logout;
};

export default useLogout;
