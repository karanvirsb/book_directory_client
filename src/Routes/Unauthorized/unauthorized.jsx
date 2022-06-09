import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const Unauthorized = () => {
    const navigate = useNavigate();
    return (
        <section className='unauthorized_section'>
            <div>
                <h1>Unauthorized</h1>
                <p>
                    This page is not accessible, you do not have the correct
                    permissions
                </p>
                <button className='btn goBack_btn' onClick={() => navigate(-1)}>
                    go back
                </button>
            </div>
        </section>
    );
};

export default Unauthorized;
