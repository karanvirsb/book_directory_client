import React from "react";

function Banner({ type, msg, refs }) {
    return (
        <div
            className={`banner ${type}Banner`}
            ref={refs}
            aria-live='assertive'
        >
            {msg}
        </div>
    );
}

export default Banner;
