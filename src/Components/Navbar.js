import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../Hooks/useLogout";

function Navbar() {
    const navigate = useNavigate();

    const logout = useLogout();

    const logoutEvent = async () => {
        await logout();
        navigate("/login");
    };
    return (
        <header className='header'>
            <div className='header__logo'>Book Finder</div>
            <nav className='nav'>
                {/* <button className='nav_btn btn' onClick={() => navigate("/")}>
                    home
                </button> */}
                <button className='logout_btn btn' onClick={logoutEvent}>
                    logout
                </button>
            </nav>
        </header>
    );
}

export default Navbar;
