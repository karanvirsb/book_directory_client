import axios from "axios";
const BASE_URL = "https://dev-karanvirsb-book-directory.herokuapp.com";
// const BASE_URL = "http://localhost:8000";
export default axios.create({
    baseURL: BASE_URL,
});

// we are going to add interceptors that will allow retrys, work with JWT to refresh the tokens
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
