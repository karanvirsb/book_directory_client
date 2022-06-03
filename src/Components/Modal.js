import React, { useState } from "react";
import { validateImage } from "image-validator";
import { useGlobalContext } from "../Helper/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../Api/axios";
import { motion } from "framer-motion";
const FormData = require("form-data");

function Modal({ type, book }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [isImageValid, setIsImageValid] = useState(false);
    const { closeModal } = useGlobalContext();

    const validateImages = async (e) => {
        const isValidImage = await validateImage(e.target.files[0]);
        setIsImageValid(isValidImage);
        if (!isValidImage) {
            alert("The image is not valid, please try again");
        }
    };

    const backdropConstraints = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const zoomInConstraints = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", bounce: 0.25, duration: 1 },
        },
        exit: { opacity: 0, scale: 0.1 },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const bodyFormData = new FormData();

        if (type === "DELETE") {
            try {
                const res = await axiosPrivate.delete("/api/books/" + book.bid);
                const message = await res.data;
                // todo success message
                navigate("/");
                alert(message.message);
                closeModal();
            } catch (err) {
                if (err?.response?.status === 403) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                }
                console.log(err);
            }
        }

        if (type === "EDIT" || e.target.elements["image"]?.files[0] === null) {
        } else {
            if (!isImageValid) {
                alert("The image is not valid, please try again");
                return;
            }
        }

        function getFormData() {
            bodyFormData.append("title", form.elements["title"].value);
            bodyFormData.append("date_info", form.elements["date_info"].value);
            bodyFormData.append(
                "author",
                form.elements["author"].value.split(", ")
            );
            bodyFormData.append("publisher", form.elements["publisher"].value);
            bodyFormData.append("category", form.elements["category"].value);
            bodyFormData.append("language", form.elements["language"].value);
            bodyFormData.append("pages", form.elements["pages"].value);
            bodyFormData.append(
                "description",
                form.elements["description"].value
            );
            bodyFormData.append("image", form.elements["image"].files[0]);

            return bodyFormData;
        }

        if (type === "ADD") {
            try {
                const res = await axiosPrivate.post(
                    "/api/books/add",
                    getFormData(),
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                const message = await res.data;

                navigate("/");
                alert(message.message);
                closeModal();
            } catch (err) {
                if (err?.response?.status === 403) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                }
                console.log(err);
            }
        }
        if (type === "EDIT") {
            const bookData = getFormData();
            bookData.append("bid", book.bid);
            try {
                const res = await axiosPrivate.put("/api/books/", bookData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                const message = await res.data;

                navigate("/");
                alert(message.message);
                closeModal();
            } catch (err) {
                if (err?.response?.status === 403) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                }
                console.log(err);
            }
        }
    };
    return (
        <motion.div
            className='modal_bg'
            variants={backdropConstraints}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            {type === "ADD" || type === "EDIT" ? (
                <motion.div
                    className='modal'
                    variants={zoomInConstraints}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                >
                    <form className='modal_form' onSubmit={handleSubmit}>
                        <div className='modal_inputContainer'>
                            <label
                                htmlFor='title_input'
                                className='modal__label'
                            >
                                title:
                            </label>
                            <input
                                type='text'
                                id='title_input'
                                className='modal__input'
                                name='title'
                                defaultValue={type === "EDIT" ? book.title : ""}
                                required
                            />
                        </div>
                        <div className='modal_inputContainer'>
                            <label
                                htmlFor='date_info_input'
                                className='modal__label'
                            >
                                Date And Information:{" "}
                            </label>
                            <input
                                type='text'
                                id='date_info_input'
                                className='modal__input'
                                name='date_info'
                                defaultValue={
                                    type === "EDIT" ? book.date_info : ""
                                }
                                required
                            />
                        </div>
                        <div className='modal_inputContainer'>
                            <label
                                htmlFor='author_input'
                                className='modal__label'
                            >
                                authors:
                            </label>
                            <input
                                type='text'
                                id='author_input'
                                className='modal__input'
                                name='author'
                                defaultValue={
                                    type === "EDIT"
                                        ? book.author.join(", ")
                                        : ""
                                }
                            />
                        </div>
                        <div className='modal_inputContainer'>
                            <label
                                htmlFor='publisher_input'
                                className='modal__label'
                            >
                                publisher:
                            </label>
                            <input
                                type='text'
                                id='publisher_input'
                                className='modal__input'
                                name='publisher'
                                defaultValue={
                                    type === "EDIT" ? book.publisher : ""
                                }
                                required
                            />
                        </div>
                        <div className='modal_inputContainer'>
                            <label
                                htmlFor='category_input'
                                className='modal__label'
                            >
                                category:
                            </label>
                            <input
                                type='text'
                                id='category_input'
                                className='modal__input'
                                name='category'
                                autoComplete='on'
                                defaultValue={
                                    type === "EDIT" ? book.category : ""
                                }
                                required
                            />
                        </div>
                        <div className='modal_inputContainer'>
                            <label
                                htmlFor='language_input'
                                className='modal__label'
                            >
                                language:
                            </label>
                            <input
                                type='text'
                                id='language_input'
                                className='modal__input'
                                name='language'
                                defaultValue={
                                    type === "EDIT" ? book.language : ""
                                }
                                required
                            />
                        </div>
                        <div className='modal_inputContainer'>
                            <label
                                htmlFor='pages_input'
                                className='modal__label'
                            >
                                pages:
                            </label>
                            <input
                                type='text'
                                id='pages_input'
                                className='modal__input'
                                name='pages'
                                defaultValue={type === "EDIT" ? book.pages : ""}
                                required
                            />
                        </div>
                        <div className='modal_inputContainer'>
                            <label
                                htmlFor='description_input'
                                className='modal__label'
                            >
                                description:{" "}
                            </label>
                            <textarea
                                type='text'
                                id='description_input'
                                className='modal__input'
                                name='description'
                                defaultValue={
                                    type === "EDIT" ? book.description : ""
                                }
                                required
                            ></textarea>
                        </div>
                        <div className='modal_inputContainer'>
                            <label
                                htmlFor='image_input'
                                className='modal__label'
                            >
                                image:
                            </label>
                            <input
                                type='file'
                                id='image_input'
                                className='modal__input'
                                name='image'
                                onChange={validateImages}
                            />
                        </div>
                        <div className='modal_buttons'>
                            <button
                                className='cancel_btn btn'
                                value='cancel'
                                type='button'
                                onClick={closeModal}
                            >
                                cancel
                            </button>
                            <button
                                type='submit'
                                className='confirm_btn btn'
                                value={type === "ADD" ? "add" : "edit"}
                            >
                                {type === "ADD" ? "add" : "edit"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            ) : (
                <motion.form
                    action=''
                    onSubmit={handleSubmit}
                    className='modal_delete'
                    variants={zoomInConstraints}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                >
                    <p className='modal_desc'>
                        Are you sure you want to delete: {book.title}
                    </p>
                    <div className='modal_buttons'>
                        <button
                            className='cancel_btn btn'
                            value='cancel'
                            type='button'
                            onClick={closeModal}
                        >
                            cancel
                        </button>
                        <button
                            className='confirm_btn btn'
                            value='yes'
                            type='submit'
                        >
                            yes
                        </button>
                    </div>
                </motion.form>
            )}
        </motion.div>
    );
}

export default Modal;
