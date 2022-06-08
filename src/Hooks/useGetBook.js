import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetBook = (url, id) => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [dataInfo, setDataInfo] = useState({
        data: [],
        isLoading: true,
        isError: false,
    });

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setDataInfo((prev) => {
            return { ...prev, isLoading: true };
        });

        axiosPrivate
            .get(`${url}${id}`, { signal: controller.signal })
            .then((res) => {
                if (isMounted) {
                    setDataInfo({
                        data: res.data,
                        isLoading: false,
                        isError: false,
                    });
                }
            })
            .catch((err) => {
                if (err?.response?.status === 403) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                }
                setDataInfo({ data: err, isLoading: false, isError: true });
            });

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [url, id]);

    return { ...dataInfo };
};

export default useGetBook;
