import React, { useEffect, useState, useRef, useCallback } from "react";
import Book from "../../Components/Book";
import { debounce } from "../../Helper/debounce";
import { useGlobalContext } from "../../Helper/AppContext";
import useBookSearch from "../../Hooks/useBookSearch";
import "./style.css";

function Home() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const { books, setBooks, openModal } = useGlobalContext();

    // fetch the books
    const { data, isLoading, isError, hasMore } = useBookSearch(
        `/api/books?search=${query}`,
        pageNumber
    );

    useEffect(() => {
        if (isError) return;
        if (!isLoading) {
            setBooks(data);
            setLoading(isLoading);
        }
    }, [isLoading, isError, data]);

    const observer = useRef(null);

    // handle the query updates
    const updateQuery = debounce((text) => {
        setPageNumber(1);
        setQuery(text);
    }, 750);

    const handleSearch = (text) => {
        setLoading(false);
        updateQuery(text);
    };

    // openModal for add button

    const openAddModal = () => {
        openModal({ type: "ADD" });
    };

    // handle loading once last element is visible
    const lastBookElementRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) {
                observer.current.disconnect();
            }
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    return (
        <section className='home_section'>
            <div className='home_header'>
                <form
                    className='home_form'
                    action=''
                    onSubmit={(e) => e.preventDefault()}
                >
                    <label htmlFor='home__search' className='home__title'>
                        Search for Books:
                    </label>
                    <input
                        type='text'
                        id='home__search'
                        onChange={(e) => handleSearch(e.target.value)}
                        aria-details='A search box for searching book title'
                    />
                </form>
            </div>
            <div className='home_btnContainer'>
                <button className='add_bookBtn' onClick={openAddModal}>
                    add book
                </button>
            </div>
            <section className='book_section'>
                {isError ? (
                    <div className='error'>Error</div>
                ) : loading ? (
                    <div className='loading'>Loading</div>
                ) : books.length === 0 ? (
                    <div>No Results</div>
                ) : (
                    <div className='book_container'>
                        {books.map((book, index) => {
                            if (index + 1 === books.length) {
                                return (
                                    <Book
                                        key={book.bid}
                                        {...book}
                                        refs={lastBookElementRef}
                                    ></Book>
                                );
                            }
                            return <Book key={book.bid} {...book}></Book>;
                        })}
                    </div>
                )}
            </section>
        </section>
    );
}

export default Home;
