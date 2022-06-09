import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import useGetBook from "../../Hooks/useGetBook";
import "./style.css";

function BookDetailsUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [bookDetail, setBookDetail] = useState({});

    const { data, isLoading, isError } = useGetBook(`/api/books/`, id);

    useEffect(() => {
        if (isError) {
            return;
        }
        if (!isLoading) {
            setBookDetail(data);
        }
    }, [isLoading, data, isError]);

    return (
        <section className='detail_section'>
            {isError ? (
                <div className='error'>Something went wrong</div>
            ) : isLoading ? (
                <Spinner></Spinner>
            ) : (
                <>
                    <div className='button_container'>
                        <button
                            className='backHome_btn'
                            onClick={() => navigate("/")}
                        >
                            back home
                        </button>
                    </div>
                    <div className='details_container'>
                        <img
                            className='details__image'
                            src={bookDetail.image?.url}
                            alt=''
                        />
                        <div className='details_info'>
                            <p className='details__header'>
                                {bookDetail.title}{" "}
                                <span className='details__date'>
                                    {bookDetail.date_info}
                                </span>
                            </p>
                            <p className='details__author'>
                                {bookDetail?.author?.length > 1
                                    ? `Authors: ${bookDetail.author.join(", ")}`
                                    : `Author: ${bookDetail.author}`}
                            </p>
                            <p className='details__publisher'>
                                Publisher: {bookDetail.publisher}
                            </p>
                            <p className='details__category'>
                                Category: {bookDetail.category}
                            </p>
                            <p className='details__language'>
                                Language: {bookDetail.language}{" "}
                            </p>
                            <p className='details__pages'>
                                Pages: {bookDetail.pages}
                            </p>
                        </div>
                    </div>
                    <section className='details_descContainer'>
                        <h3 className='desc__title'>Description</h3>
                        <hr />
                        <p className='details__description'>
                            {bookDetail.description}
                        </p>
                    </section>
                </>
            )}
        </section>
    );
}

export default BookDetailsUser;
