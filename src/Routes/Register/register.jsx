import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { ImCheckmark } from "react-icons/im";
import ToolTip from "../../Components/ToolTip";
import Banner from "../../Components/Banner";
import "./style.css";
import axios from "../../Api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;

function Register() {
    const navigate = useNavigate();
    const userRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocused, setUserFocused] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocused, setMatchFocused] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("/register", { user, password })
            .then((res) => {
                if (res.status === 201) {
                    navigate("/registration-successful");
                }
            })
            .catch((err) => {
                // console.log(err);
                if (err.response.status === 409) {
                    setIsError(true);
                    setErrMsg(`'${user}' already exists`);
                    userRef.current.focus();
                }
            });
    };

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
    }, [password]);

    useEffect(() => {
        const result = matchPassword === password;
        setValidMatch(result);
    }, [matchPassword]);

    useEffect(() => {
        let timer;
        if (isError) {
            timer = setTimeout(() => {
                setIsError(false);
                setErrMsg("");
            }, 7500);
        }
        return () => clearTimeout(timer);
    }, [isError]);

    return (
        <section className='register_section'>
            <form action='' className='register_form' onSubmit={handleSubmit}>
                {isError && <Banner type={"error"} msg={errMsg}></Banner>}
                <h1 className='register_title'>
                    <BsPerson></BsPerson>sign up
                </h1>
                <div className='rf_container'>
                    <label htmlFor='rf_username' className='rf_label'>
                        username:{" "}
                        {user &&
                            (validName ? (
                                <ImCheckmark className='checkmark'></ImCheckmark>
                            ) : (
                                <FaTimes className='faTimes'></FaTimes>
                            ))}
                    </label>
                    <input
                        type='text'
                        id='rf_username'
                        ref={userRef}
                        onChange={(e) => setUser(e.target.value)}
                        className='rf_input'
                        autoComplete='off'
                        aria-describedby='usernameHelp'
                        aria-invalid={validName ? "false" : "true"}
                        onFocus={() => setUserFocused(true)}
                        onBlur={() => setUserFocused(false)}
                        required
                    />
                    <ToolTip
                        id='usernameHelp'
                        toolTipText={"Username must be 4 to 24 characters long"}
                        classes={
                            userFocused && user && !validName
                                ? "tool_tip"
                                : "off_screen"
                        }
                    ></ToolTip>
                </div>
                <div className='rf_container'>
                    <label htmlFor='rf_password' className='rf_label'>
                        password:{" "}
                        {password &&
                            (validPassword ? (
                                <ImCheckmark className='checkmark'></ImCheckmark>
                            ) : (
                                <FaTimes className='faTimes'></FaTimes>
                            ))}
                    </label>
                    <input
                        type='password'
                        id='rf_password'
                        className='rf_input'
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        aria-describedby='passwordHelp'
                        aria-invalid={validPassword ? "false" : "true"}
                        autoComplete='off'
                        required
                    />
                    <ToolTip
                        id='passwordHelp'
                        classes={
                            passwordFocused && password && !validPassword
                                ? "tool_tip"
                                : "off_screen"
                        }
                        toolTipText={
                            "Password must have atleast 1 capital letter \n Atleast 1 of these symbols '!@#$%_' \n Must be 8 to 24 characters long "
                        }
                    ></ToolTip>
                </div>
                <div className='rf_container'>
                    <label htmlFor='rf_confirmPassword' className='rf_label'>
                        confirm password:{" "}
                        {matchPassword &&
                            (validMatch ? (
                                <ImCheckmark className='checkmark'></ImCheckmark>
                            ) : (
                                <FaTimes className='faTimes'></FaTimes>
                            ))}
                    </label>
                    <input
                        type='password'
                        id='rf_confirmPassword'
                        className='rf_input'
                        onChange={(e) => setMatchPassword(e.target.value)}
                        onFocus={() => setMatchFocused(true)}
                        onBlur={() => setMatchFocused(false)}
                        aria-describedby='matchPasswordHelp'
                        aria-invalid={validPassword ? "false" : "true"}
                        autoComplete='off'
                        required
                    />
                    <ToolTip
                        id='matchPasswordHelp'
                        classes={
                            matchFocused && matchPassword && !validMatch
                                ? "tool_tip"
                                : "off_screen"
                        }
                        toolTipText={
                            "Password must match what was previously entered"
                        }
                    ></ToolTip>
                </div>
                <div className='rf_btnContainer'>
                    {validName && validPassword && validMatch ? (
                        <button className='rf_registerBtn btn' type='submit'>
                            signUp
                        </button>
                    ) : (
                        <button
                            className='rf_registerBtn btn disabled'
                            type='submit'
                            disabled
                            style={{ cursor: "default" }}
                        >
                            signUp
                        </button>
                    )}

                    <button
                        className='rf_loginBtn'
                        type='button'
                        onClick={() => navigate("/login")}
                    >
                        already registered?
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Register;
