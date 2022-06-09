import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <section className='pageNotFound_section'>
            <div>
                <h1>404 Page not found</h1>
                <button className='btn goBack_btn' onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        </section>
    );
};

export default PageNotFound;
