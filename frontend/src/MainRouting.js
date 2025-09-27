import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import MainFrontPage from './components/FrontPage/MainFrontPage'
import Analysis from './components/Analysis/Analysis'
import AddYourData from './components/AddYourData/AddYourData'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/authscreens/Login'
import Signup from './components/authscreens/Signup'

function MainRouting() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navbar />} >
                        <Route index element={<MainFrontPage />} />
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='adddata' element={<AddYourData />} />
                        <Route path='analyseYourData' element={<Analysis />} />
                        <Route path='login' element={<Login/>} />
                        <Route path ='signup' element={<Signup/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRouting