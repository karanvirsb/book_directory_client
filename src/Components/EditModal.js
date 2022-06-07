import React, { useState } from "react";

import { useGlobalContext } from "../Helper/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../Api/axios";
import { motion } from "framer-motion";
import useGetFormData from "../Hooks/useGetFormData";
import useValidateImage from "../Hooks/useValidateImage";
import useGetRoles from "../Hooks/useGetRoles";
import { toast } from "react-toastify";

const EditModal = ({ book }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getFormData, getJsonData } = useGetFormData();
    const [imageToValidate, setImageToValidate] = useState("");
    const [imageType, setImageType] = useState("");
    const { isImageValid } = useValidateImage(imageToValidate);
    const { closeModal, books, setBooks } = useGlobalContext();
    const { verifyRoles } = useGetRoles();

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
        if (
            !isImageValid &&
            e.target.elements["image"].files[0] !== undefined
        ) {
            toast.error("Image format is incorrect", { toastId: 1 });
            return;
        }
        if (verifyRoles([2000])) {
            const form = getJsonData(e.target);
            form["bid"] = book.bid;
            if (book?.created) {
                form["created"] = true;
            }
            form["image_type"] = imageType;
            console.log(form);
            const otherBooks = books.filter((b) => b.bid !== book.bid);
            setBooks([...otherBooks, form]);
            closeModal();
            toast.success(
                "Book was edited but not shown due to this being a demo"
            );
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            return;
        }
        const bookData = getFormData(e.target);
        bookData["bid"] = book.bid;
        bookData["image_type"] = imageType;
        try {
            closeModal();
            toast.promise(
                axiosPrivate.put("/api/books/", bookData, {
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                {
                    pending: "Editing book",
                    success: {
                        render() {
                            return "Book has been editted";
                        },
                    },
                    error: "Could not edit the book",
                },
                {
                    onClose: () => {
                        window.location.reload();
                    },
                    autoClose: 5000,
                }
            );
            // const res = await axiosPrivate.put("/api/books/", bookData, {
            //     headers: { "Content-Type": "multipart/form-data" },
            // });
            // const message = await res.data;
        } catch (err) {
            if (err?.response?.status === 403) {
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
            console.log(err);
        }
    };

    const validateImages = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0] !== null || e.target.files[0] !== undefined) {
            setImageToValidate(e.target.files[0]);
            setImageType(e.target.files[0].type);
        }
    };

    return (
        <motion.div
            className='modal'
            variants={zoomInConstraints}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e) => e.stopPropagation()}
        >
            <form className='modal_form' onSubmit={handleSubmit}>
                <div className='modal_inputContainer'>
                    <label htmlFor='title_input' className='modal__label'>
                        title:
                    </label>
                    <input
                        type='text'
                        id='title_input'
                        className='modal__input'
                        name='title'
                        defaultValue={book.title}
                        required
                    />
                </div>
                <div className='modal_inputContainer'>
                    <label htmlFor='date_info_input' className='modal__label'>
                        Date And Information:{" "}
                    </label>
                    <input
                        type='text'
                        id='date_info_input'
                        className='modal__input'
                        name='date_info'
                        defaultValue={book.date_info}
                        required
                    />
                </div>
                <div className='modal_inputContainer'>
                    <label htmlFor='author_input' className='modal__label'>
                        authors:
                    </label>
                    <input
                        type='text'
                        id='author_input'
                        className='modal__input'
                        name='author'
                        defaultValue={book.author.join(", ")}
                    />
                </div>
                <div className='modal_inputContainer'>
                    <label htmlFor='publisher_input' className='modal__label'>
                        publisher:
                    </label>
                    <input
                        type='text'
                        id='publisher_input'
                        className='modal__input'
                        name='publisher'
                        defaultValue={book.publisher}
                        required
                    />
                </div>
                <div className='modal_inputContainer'>
                    <label htmlFor='category_input' className='modal__label'>
                        category:
                    </label>
                    <input
                        type='text'
                        id='category_input'
                        className='modal__input'
                        name='category'
                        autoComplete='on'
                        defaultValue={book.category}
                        required
                    />
                </div>
                <div className='modal_inputContainer'>
                    <label htmlFor='language_input' className='modal__label'>
                        language:
                    </label>
                    <input
                        type='text'
                        id='language_input'
                        className='modal__input'
                        name='language'
                        defaultValue={book.language}
                        required
                    />
                </div>
                <div className='modal_inputContainer'>
                    <label htmlFor='pages_input' className='modal__label'>
                        pages:
                    </label>
                    <input
                        type='text'
                        id='pages_input'
                        className='modal__input'
                        name='pages'
                        defaultValue={book.pages}
                        required
                    />
                </div>
                <div className='modal_inputContainer'>
                    <label htmlFor='description_input' className='modal__label'>
                        description:{" "}
                    </label>
                    <textarea
                        type='text'
                        id='description_input'
                        className='modal__input'
                        name='description'
                        defaultValue={book.description}
                        required
                    ></textarea>
                </div>
                <div className='modal_inputContainer'>
                    <label htmlFor='image_input' className='modal__label'>
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
                        value={"edit"}
                    >
                        edit
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default EditModal;
