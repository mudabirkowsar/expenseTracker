import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common';
import "./Navbar.css"

function Navbar() {
    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const [isLogin, setIsLogin] = useState(false);
    const[openNav, setOpenNav] = useState(false)
    const nav = useNavigate();
    const notify = (message) => toast(message); // Function to show toast message

    const openLoginBox = () => {
        setLogin(true);
    }
    const closeLoginBox = () => {
        setLogin(false);
    }

    const openFromSignup = () => {
        setLogin(true)
        setSignup(false)
    }

    const openSignupBoxFromLoginBox = () => {
        setSignup(true)
        setLogin(false)
    }

    const closeSignupBox = () => {
        setSignup(false);
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        const token = sessionStorage.getItem("user");
        if (token) {
            setIsLogin(true);
        }
    }, [nav])


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default behaviour of form submission
        await axios.post(SummaryApi.SingupUser.url, formData)
            .then((res) => {
                if (res.data.success === true) {
                    sessionStorage.setItem("user", res.data.tok)
                    notify(res.data.message)
                    setSignup(false)
                }
            })
            .catch(err => {
                notify(err.response.data.message)
            })

        setFormData({
            name: '',
            email: "",
            password: '',
        })
    }

    //Login Data starts from here

    const [loginData, setLoginData] = useState({
        loginEmail: '',
        loginPassword: ''
    })

    const handleLoginChange = (e) => {
        const { name, value } = e.target
        setLoginData({
            ...loginData,
            [name]: value,
        })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        axios.post(SummaryApi.LoginUser.url, loginData)
            .then((res) => {
                if (res.data.success === true) {
                    // console.log(res.data.data._id)
                    sessionStorage.setItem('user', res.data.tok)
                    sessionStorage.setItem('userId', res.data.data._id)

                    setLogin(false)
                    setIsLogin(true)
                    setLoginData({
                        email: '',
                        password: '',
                    })
                }
                notify(res.data.message)
            })
            .catch(err => {
                notify(err.response.data.message)
            })
    };

    const logout = () => {
        sessionStorage.clear();
        setIsLogin(false);
        toast("Logged Out Successfully")
        nav("/")
    }

    const openNavbar = () => {
        setOpenNav(!openNav)
    }



    return (
        <>
            <div className="navbar">
                <ToastContainer
                    position='bottom-right' />
                <Link className='logo' to='/'>
                    <div className="logo">logo</div>
                </Link>
                <i onClick={openNavbar} class="fa-solid fa-bars"></i>
                
                <div className={openNav ? "listItems openNavBar  " :"listItems "}>
                    <Link className='linkTags' to='/'><li className='linkTags' >Home</li></Link>
                    {/* <Link className='linkTags' to='/analysis'><li className='linkTags'>Analysis</li></Link> */}
                    <Link className='linkTags' to='/dashboard'><li className='linkTags'>Dashboard</li></Link>
                    <Link className='linkTags' to='/adddata'><li className='linkTags'>Add Your Data</li></Link>   
                </div>
                
                {
                    isLogin ?
                        <div className="contact">
                            <p className='loginBtn' onClick={logout}>Logout</p>
                        </div>
                        :
                        <div className="contact">
                            <p onClick={openLoginBox} className='loginBtn'>Login</p>
                        </div>
                }
            </div>
            <div className="abcd"></div>

            {
                login ?
                    <div className="login-container">
                        <h1 className='closeBtn' onClick={closeLoginBox}>✖️</h1>
                        <form className="login-form" onSubmit={handleLoginSubmit}>
                            <h2>Login</h2>
                            <div className="form-group">
                                <label for="loginEmail">Email</label>
                                <input type="email"
                                    id="loginEmail"
                                    name="loginEmail"
                                    placeholder="Enter your email"
                                    value={loginData.loginEmail}
                                    onChange={handleLoginChange}
                                    required />
                            </div>
                            <div className="form-group">
                                <label for="loginPassword">Password</label>
                                <input type="password"
                                    id="loginPassword"
                                    name="loginPassword"
                                    placeholder="Enter your password"
                                    value={loginData.loginPassword}
                                    onChange={handleLoginChange}
                                    required />
                            </div>
                            <button type="submit">Login</button>
                            <p className="register-link">Don't have an account?<Link onClick={openSignupBoxFromLoginBox} >Register here</Link></p>
                        </form>
                    </div>
                    : null
            }

            {
                signup ?
                    <div className="signup-container">
                        <h1 className='closeBtn' onClick={closeSignupBox}>✖️</h1>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <h2>Signup</h2>
                            <div className="form-group">
                                <label for="name">Name</label>
                                <input type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required />
                            </div>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required />
                            </div>
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required />
                            </div>
                            <button type="submit">Signup</button>
                            <p className="register-link">Already Have Account? <Link onClick={openFromSignup}>Login here</Link></p>
                        </form>
                    </div>
                    : null
            }
            <hr />
            <Outlet />
        </>
    )
}

export default Navbar