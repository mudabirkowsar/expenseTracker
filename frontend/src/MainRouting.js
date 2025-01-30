import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import MainFrontPage from './components/FrontPage/MainFrontPage'
import Analysis from './components/Analysis/Analysis'
import AddYourData from './components/AddYourData/AddYourData'
import Dashboard from './components/Dashboard/Dashboard'
import LoginNow from './components/ExtraComponents/LoginNow'

function MainRouting() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navbar />} >
                        <Route index element={<MainFrontPage />} />
                        {/* <Route path='analysis' element={<Analysis/>}/> */}
                        <Route path='dashboard' element={<Dashboard/>}/>
                        <Route path='adddata' element={<AddYourData/>}/>
                        <Route path='analyseYourData' element={<Analysis/>}/>
                        <Route path='loginNow' element={<LoginNow/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRouting