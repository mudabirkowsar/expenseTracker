import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Navbar.css";

function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("user");
        if (token) {
            setIsLogin(true);
        }
    }, [nav]);

    const logout = () => {
        sessionStorage.clear();
        setIsLogin(false);
        toast("Logged Out Successfully");
        nav("/");
    };

    const openNavbar = () => {
        setOpenNav(!openNav);
    };

    return (
        <>
            <div className="navbar">
                <ToastContainer position="bottom-right" />
                <Link className="logo" to="/">
                    <div className="logo">logo</div>
                </Link>
                <i onClick={openNavbar} className="fa-solid fa-bars"></i>

                <div className={openNav ? "listItems openNavBar" : "listItems"}>
                    <Link className="linkTags" to="/"><li>Home</li></Link>
                    <Link className="linkTags" to="/dashboard"><li>Dashboard</li></Link>
                    <Link className="linkTags" to="/adddata"><li>Add Your Data</li></Link>
                </div>

                {isLogin ? (
                    <div className="contact">
                        <p className="loginBtn" onClick={logout}>Logout</p>
                    </div>
                ) : (
                    <div className="contact">
                        <Link to="/login" className="loginBtn">Login</Link>
                    </div>
                )}
            </div>
            <div className="abcd"></div>
            <Outlet/>
        </>
    );
}

export default Navbar;
