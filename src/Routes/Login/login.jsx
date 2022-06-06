import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../Api/axios";
import useAuth from "../../Hooks/useAuth";
import { BsFillPersonFill } from "react-icons/bs";
import Banner from "../../Components/Banner";
import "./style.css";

const LOGIN_URL = "/login";

function Login() {
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef(null);
    const errRef = useRef(null);

    const [user, setUser] = useState("");

    const [password, setPassword] = useState("");

    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                { user, password },
                {
                    headers: { "Context-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.accessToken;
            setAuth({ user, accessToken });
            navigate(from, { replace: true });
            setUser("");
            setPassword("");
        } catch (err) {
            // console.log(err);
            if (!err?.response) {
                setErrMsg("No Server Response");
                setIsError(true);
            } else if (err.response?.status === 400) {
                setErrMsg("The username or password was incorrect");
                setIsError(true);
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
                setIsError(true);
            } else {
                setErrMsg("Login Failed");
                setIsError(true);
            }

            //errRef.current.focus();
        }
    };

    const loadDemoUser = async () => {
        try {
            const response = await axios.post(
                LOGIN_URL,
                { user: "demo", password: "Demo_1234" },
                {
                    headers: { "Context-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.accessToken;
            setAuth({ user, accessToken });
            navigate("/demo", { replace: true });
            setUser("");
            setPassword("");
        } catch (err) {
            // console.log(err);
            if (!err?.response) {
                setErrMsg("No Server Response");
                setIsError(true);
            } else if (err.response?.status === 400) {
                setErrMsg("The username or password was incorrect");
                setIsError(true);
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
                setIsError(true);
            } else {
                setErrMsg("Login Failed");
                setIsError(true);
            }

            //errRef.current.focus();
        }
    };

    const togglePersist = () => {
        setPersist((prev) => !prev);
    };

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        let timer;
        if (isError) {
            timer = setTimeout(() => {
                setIsError(false);
                setErrMsg("");
            }, 7500);
        }
        return () => clearTimeout(timer);
    }, [isError === true]);

    return (
        <section className='login_section'>
            <form action='' className='login_form' onSubmit={handleSubmit}>
                {isError && (
                    <Banner type='error' msg={errMsg} refs={errRef}></Banner>
                )}

                <h1 className='login_title'>
                    {" "}
                    <BsFillPersonFill></BsFillPersonFill>sign in
                </h1>
                <div className='lf_container'>
                    <label htmlFor='lf_username' className='lf_label'>
                        username: <span className='is_user_correct'></span>
                    </label>
                    <input
                        type='text'
                        id='lf_username'
                        className='lf_input'
                        name='user'
                        ref={userRef}
                        onChange={(evt) => {
                            setUser(evt.target.value);
                        }}
                        value={user}
                        required
                    />
                </div>
                <div className='lf_container'>
                    <label htmlFor='lf_password' className='lf_label'>
                        password: <span className='is_password_correct'></span>
                    </label>
                    <input
                        type='password'
                        id='lf_password'
                        className='lf_input'
                        name='password'
                        onChange={(evt) => {
                            setPassword(evt.target.value);
                        }}
                        value={password}
                        required
                    />
                </div>
                <div className='persistCheck'>
                    <input
                        type='checkbox'
                        name=''
                        id='persist'
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor='persist'>Trust This Device</label>
                </div>
                <div className='lf_btnContainer'>
                    <button className='lf_loginBtn btn' type='submit'>
                        login
                    </button>
                    <button
                        className='lf_registerBtn btn'
                        type='button'
                        onClick={() => navigate("/register")}
                    >
                        register
                    </button>
                    <button type='button' onClick={() => loadDemoUser()}>
                        demo admin
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Login;
