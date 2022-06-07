import React, { useState } from "react";

import { useGlobalContext } from "../Helper/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../Api/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useGetFormData from "../Hooks/useGetFormData";
import useValidateImage from "../Hooks/useValidateImage";
import useGetRoles from "../Hooks/useGetRoles";

const AddModal = () => {
    const [imageToValidate, setImageToValidate] = useState("");
    const [imageType, setImageType] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { getFormData, getJsonData } = useGetFormData();
    const { verifyRoles } = useGetRoles();
    const { isImageValid } = useValidateImage(imageToValidate);
    const { closeModal } = useGlobalContext();
    const { setBooks } = useGlobalContext();

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
        if (!isImageValid) {
            return;
        }
        if (verifyRoles([2000])) {
            const form = getJsonData(e.target);
            form["created"] = true;
            form["image_type"] = imageType;
            setBooks((prev) => [...prev, form]);
            closeModal();
            toast.success("Added the book");
            return;
        }
        try {
            // const res = await axiosPrivate.post(
            //     "/api/books/add",
            //     getFormData(e.target),
            //     {
            //         headers: { "Content-Type": "multipart/form-data" },
            //     }
            //     );
            closeModal();
            const form = getFormData(e.target);
            form["image_type"] = imageType;
            console.log(form);
            // toast.promise(
            //     axiosPrivate.post("/api/books/add", form, {
            //         headers: { "Content-Type": "multipart/form-data" },
            //     }),
            //     {
            //         pending: "Adding book",
            //         success: "Book has been added",
            //         error: "Could not add the book",
            //     }
            // );
            // alert(message.message);
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
        setImageToValidate(e.target.files[0]);
        setImageType(e.target.files[0].type);
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
                        value={"add"}
                    >
                        add
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddModal;
