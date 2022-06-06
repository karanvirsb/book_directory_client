import React from "react";
import { useGlobalContext } from "../Helper/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../Api/axios";
import { motion } from "framer-motion";
import useGetRoles from "../Hooks/useGetRoles";
import { toast } from "react-toastify";

const DeleteModal = ({ book }) => {
    const navigate = useNavigate();
    const location = useLocation();

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
        if (verifyRoles([2000])) {
            const otherBooks = books.filter((b) => b.bid !== book.bid);
            setBooks(otherBooks);
            closeModal();
            toast.success("Book has been deleted");
            setTimeout(() => {
                navigate("/demo");
            }, 3000);
            return;
        }
        try {
            closeModal();
            toast.promise(
                axiosPrivate.delete("/api/books/" + book.bid),
                {
                    pending: "Deleting the book",
                    success: "Book has been deleted",
                    error: "Book could not be deleted",
                },
                {
                    onClose: () => {
                        navigate("/admin");
                    },
                }
            );
            // const res = await axiosPrivate.delete("/api/books/" + book.bid);
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

    return (
        <motion.form
            action=''
            onSubmit={handleSubmit}
            className='modal_delete'
            variants={zoomInConstraints}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={(e) => e.stopPropagation()}
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
                <button className='confirm_btn btn' value='yes' type='submit'>
                    yes
                </button>
            </div>
        </motion.form>
    );
};

export default DeleteModal;
