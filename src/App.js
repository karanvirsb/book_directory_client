import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import {
    Home,
    HomeUser,
    BookDetails,
    BookDetailsUser,
    Login,
    Register,
    SuccessRegistration,
} from "./Routes";
import RequireAuth from "./Components/RequireAuth";

import PersistLogin from "./Components/PersistLogin";
import Modal from "./Components/Modal";
import { useGlobalContext } from "./Helper/AppContext";
import Navbar from "./Components/Navbar";
import AddModal from "./Components/AddModal";
import EditModal from "./Components/EditModal";
import DeleteModal from "./Components/DeleteModal";
import DemoBookDetails from "./Routes/BookDetails/book-detail-demo";
import DemoHome from "./Routes/Home/home-demo";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

if (process.env.NODE_ENV === "production") {
    disableReactDevTools();
}

const LayoutsWithNavbar = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </>
    );
};

function App() {
    const { modalSettings } = useGlobalContext();
    return (
        <Router>
            <ToastContainer
                autoClose={8000}
                position='top-right'
                hideProgressBar={false}
                newestOnTop={false}
                pauseOnFocusLoss={true}
                pauseOnHover={true}
                draggable
                draggablePercent={90}
            ></ToastContainer>
            <AnimatePresence exitBeforeEnter={true} initial={false}>
                {modalSettings.open && (
                    <Modal>
                        {modalSettings.type === "ADD" ? (
                            <AddModal></AddModal>
                        ) : modalSettings.type === "EDIT" ? (
                            <EditModal book={modalSettings.book}></EditModal>
                        ) : (
                            <DeleteModal
                                book={modalSettings.book}
                            ></DeleteModal>
                        )}
                    </Modal>
                )}
            </AnimatePresence>

            <Routes>
                {/* Public routes */}
                <Route path='login' element={<Login></Login>}></Route>
                <Route path='register' element={<Register></Register>}></Route>
                <Route
                    path='registration-successful'
                    element={<SuccessRegistration></SuccessRegistration>}
                ></Route>
                {/* Protected routes */}
                <Route element={<PersistLogin />}>
                    <Route element={<LayoutsWithNavbar></LayoutsWithNavbar>}>
                        <Route element={<RequireAuth allowedRoles={[2001]} />}>
                            <Route
                                path='/'
                                element={<HomeUser></HomeUser>}
                            ></Route>
                            <Route
                                path='/book/detail/:id'
                                element={<BookDetailsUser></BookDetailsUser>}
                            ></Route>
                        </Route>
                    </Route>
                    <Route element={<LayoutsWithNavbar></LayoutsWithNavbar>}>
                        <Route
                            element={
                                <RequireAuth allowedRoles={[1984, 5150]} />
                            }
                        >
                            <Route
                                path='/admin'
                                element={<Home></Home>}
                            ></Route>
                            <Route
                                path='/admin/book/detail/:id'
                                element={<BookDetails></BookDetails>}
                            ></Route>
                        </Route>
                    </Route>
                    <Route element={<LayoutsWithNavbar></LayoutsWithNavbar>}>
                        <Route element={<RequireAuth allowedRoles={[2000]} />}>
                            <Route
                                path='/demo'
                                element={<DemoHome></DemoHome>}
                            ></Route>
                            <Route
                                path='/demo/book/detail/:id'
                                element={<DemoBookDetails></DemoBookDetails>}
                            ></Route>
                        </Route>
                    </Route>
                </Route>
                {/* Catch all other routes */}
                <Route path='*' element={<div>404 Not Found</div>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
