import React from "react";
import { GrCircleInformation } from "react-icons/gr";

function ToolTip({ id, toolTipText, classes }) {
    return (
        <p
            id={`${id}`}
            className={`${classes}`}
            aria-hidden='false'
            tabIndex={0}
            aria-live='assertive'
        >
            {GrCircleInformation} {toolTipText}
        </p>
    );
}

export default ToolTip;
