import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function useBookSearch(url, pageNumber) {
    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setData([]);
    }, [url]);

    useEffect(() => {
        console.log(pageNumber);
        let isMounted = true;
        const cancelTokenSource = axios.CancelToken.source();

        setIsLoading(true);
        setIsError(false);

        axiosPrivate
            .get(url + `&page=${pageNumber}`, {
                cancelToken: cancelTokenSource.token,
            })
            .then((res) => {
                if (isMounted) {
                    setData((prev) => {
                        return [...prev, ...res.data.data];
                    });
                    setIsLoading(false);
                    setIsError(false);
                    setHasMore(res.data.hasNext);
                }
            })
            .catch((err) => {
                if (axios.isCancel(err)) return;

                if (err?.response?.status === 403) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                }
                setData(err);
                setIsLoading(false);
                setIsError(true);
                setHasMore(false);
            });

        return () => {
            isMounted = false;
            cancelTokenSource.cancel();
        };
    }, [url, pageNumber]);

    return { data, isLoading, isError, hasMore };
}

export default useBookSearch;
