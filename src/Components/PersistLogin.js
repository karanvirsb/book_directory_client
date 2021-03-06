import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../Hooks/useRefreshToken";
import useAuth from "../Hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                // console.log(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        // we need to have an access token before running this verifyRefreshToken
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    return (
        <>
            {!persist ? (
                <Outlet></Outlet>
            ) : isLoading ? (
                <p>Loading...</p>
            ) : (
                <Outlet></Outlet>
            )}
        </>
    );
};

export default PersistLogin;
