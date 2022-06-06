import React from "react";
import { useGlobalContext } from "../Helper/AppContext";
import { motion } from "framer-motion";
// import { validateImage } from "image-validator";
// import { useNavigate, useLocation } from "react-router-dom";
// import { axiosPrivate } from "../Api/axios";
// const FormData = require("form-data");

function Modal({ children }) {
    // const navigate = useNavigate();
    // const location = useLocation();

    const { closeModal } = useGlobalContext();

    const backdropConstraints = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const bodyFormData = new FormData();

    //     if (type === "EDIT" || e.target.elements["image"]?.files[0] === null) {
    //     } else {
    //         if (!isImageValid) {
    //             alert("The image is not valid, please try again");
    //             return;
    //         }
    //     }

    //     function getFormData() {
    //         bodyFormData.append("title", form.elements["title"].value);
    //         bodyFormData.append("date_info", form.elements["date_info"].value);
    //         bodyFormData.append(
    //             "author",
    //             form.elements["author"].value.split(", ")
    //         );
    //         bodyFormData.append("publisher", form.elements["publisher"].value);
    //         bodyFormData.append("category", form.elements["category"].value);
    //         bodyFormData.append("language", form.elements["language"].value);
    //         bodyFormData.append("pages", form.elements["pages"].value);
    //         bodyFormData.append(
    //             "description",
    //             form.elements["description"].value
    //         );
    //         bodyFormData.append("image", form.elements["image"].files[0]);

    //         return bodyFormData;
    //     }

    //     if (type === "ADD") {
    //         try {
    //             const res = await axiosPrivate.post(
    //                 "/api/books/add",
    //                 getFormData(),
    //                 {
    //                     headers: { "Content-Type": "multipart/form-data" },
    //                 }
    //             );
    //             const message = await res.data;

    //             navigate("/");
    //             alert(message.message);
    //             closeModal();
    //         } catch (err) {
    //             if (err?.response?.status === 403) {
    //                 navigate("/login", {
    //                     state: { from: location },
    //                     replace: true,
    //                 });
    //             }
    //             console.log(err);
    //         }
    //     }
    //     if (type === "EDIT") {
    //         const bookData = getFormData();
    //         bookData.append("bid", book.bid);
    //         try {
    //             const res = await axiosPrivate.put("/api/books/", bookData, {
    //                 headers: { "Content-Type": "multipart/form-data" },
    //             });
    //             const message = await res.data;

    //             navigate("/");
    //             alert(message.message);
    //             closeModal();
    //         } catch (err) {
    //             if (err?.response?.status === 403) {
    //                 navigate("/login", {
    //                     state: { from: location },
    //                     replace: true,
    //                 });
    //             }
    //             console.log(err);
    //         }
    //     }
    // };
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
