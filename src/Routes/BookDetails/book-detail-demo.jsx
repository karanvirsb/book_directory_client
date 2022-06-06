import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../Helper/AppContext";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
// import useBookSearch from "../../Hooks/useBookSearch";
// import useGetBook from "../../Hooks/useGetBook";
import "./style.css";

function DemoBookDetails() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { openModal, books } = useGlobalContext();
    const [detailBook, setDetailBook] = useState();
    const [isLoading, setIsLoading] = useState(true);

    function getBook() {
        setIsLoading(true);
        axiosPrivate
            .get(`/api/books/${id}`)
            .then((res) => {
                console.log(res.data);
                setDetailBook(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                if (err?.response?.status === 403) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                }
            });
    }

    useEffect(() => {
        if (books.find((book) => book.bid === id)?.created === true) {
            setDetailBook(books.find((book) => book.bid === id));
            setIsLoading(false);
        } else {
            getBook();
        }
    }, []);

    return (
        <section className='detail_section'>
            {isLoading ? (
                <div className='loading'>loading...</div>
            ) : (
                <>
                    <div className='button_container'>
                        <button
                            className='backHome_btn'
                            onClick={() => navigate("/demo")}
                        >
                            back home
                        </button>
                        <div className='mutable_btns'>
                            <button
                                className='update_btn'
                                onClick={() =>
                                    openModal({
                                        type: "EDIT",
                                        book: detailBook,
                                    })
                                }
                            >
                                update
                            </button>
                            <button
                                className='delete_btn'
                                onClick={() =>
                                    openModal({
                                        type: "DELETE",
                                        book: detailBook,
                                    })
                                }
                            >
                                delete
                            </button>
                        </div>
                    </div>
                    <div className='details_container'>
                        <img
                            className='details__image'
                            src={detailBook.image}
                            alt=''
                        />
                        <div className='details_info'>
                            <p className='details__header'>
                                {detailBook.title}{" "}
                                <span className='details__date'>
                                    {detailBook.date_info}
                                </span>
                            </p>
                            <p className='details__author'>
                                {detailBook?.author?.length > 1
                                    ? `Authors: ${detailBook.author.join(", ")}`
                                    : `Author: ${detailBook.author}`}
                            </p>
                            <p className='details__publisher'>
                                Publisher: {detailBook.publisher}
                            </p>
                            <p className='details__category'>
                                Category: {detailBook.category}
                            </p>
                            <p className='details__language'>
                                Language: {detailBook.language}{" "}
                            </p>
                            <p className='details__pages'>
                                Pages: {detailBook.pages}
                            </p>
                        </div>
                    </div>
                    <section className='details_descContainer'>
                        <h3 className='desc__title'>Description</h3>
                        <hr />
                        <p className='details__description'>
                            {detailBook.description}
                        </p>
                    </section>
                </>
            )}
        </section>
    );
}

export default DemoBookDetails;
