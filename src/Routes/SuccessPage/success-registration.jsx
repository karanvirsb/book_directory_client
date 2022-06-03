import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function SuccessRegistration() {
    const navigate = useNavigate();
    return (
        <section className='success_section'>
            <div className='success_container'>
                <h1 className='success__title'>
                    registration was <span>successful</span>
                </h1>
                <p className='success__message'>
                    head back to the login page to continue
                </p>
                <button
                    className='sr_loginBtn btn'
                    onClick={() => navigate("/login")}
                >
                    login
                </button>
            </div>
        </section>
    );
}

export default SuccessRegistration;
