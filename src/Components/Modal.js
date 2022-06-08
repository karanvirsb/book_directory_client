import React from "react";
import { useGlobalContext } from "../Helper/AppContext";
import { motion } from "framer-motion";

function Modal({ children }) {
    const { closeModal } = useGlobalContext();

    const backdropConstraints = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <motion.div
            className='modal_bg'
            variants={backdropConstraints}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={closeModal}
        >
            {children}
        </motion.div>
    );
}

export default Modal;
