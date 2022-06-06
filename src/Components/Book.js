import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Helper/AppContext";
import useGetRoles from "../Hooks/useGetRoles";

function Book({ bid, image, title, author = [], refs }) {
    let navigate = useNavigate();
    const { verifyRoles } = useGetRoles();
    const { books } = useGlobalContext();
    return (
        <figure
            ref={refs}
            className='book'
            onClick={() =>
                verifyRoles([2000])
                    ? navigate(`/demo/book/detail/${bid}`)
                    : navigate(`book/detail/${bid}`)
            }
        >
            <img className='book__img' src={image} alt={title + " image"}></img>
            <figcaption className='book_caption'>
                <p className='book__title'>{title.trim()}</p>
                <p className='book__author'>
                    {author.length > 0 && `by: ${author.join(", ")}`}
                </p>
            </figcaption>
        </figure>
    );
}

export default Book;
