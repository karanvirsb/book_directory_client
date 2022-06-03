import React, { useContext, useState } from "react";

const AppContext = React.createContext();

function AppProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [modalSettings, setModalSettings] = useState({
        open: false,
        type: "",
        book: {},
    });

    const openModal = ({ type, book }) => {
        console.log(type);
        if (type === "ADD") {
            setModalSettings({ open: true, type: type, book: {} });
            return;
        }

        if (!book) return;

        setModalSettings({ open: true, type, book: book });
    };

    const closeModal = () => {
        setModalSettings({ open: false, type: "", book: {} });
    };

    return (
        <AppContext.Provider
            value={{
                books,
                setBooks,
                modalSettings,
                setModalSettings,
                openModal,
                closeModal,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
