import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Pages/Shared/Header/Header';
import Footer from './Pages/Shared/Footer/Footer';
import { AuthContext } from './AuthProvider';

const Main = () => {
    const a = useContext(AuthContext)
    useEffect(()=>{
        console.log(a)
    })
    return (
        <div>
            <Header />
            <Outlet></Outlet>
            <Footer />
        </div>
    );
};

export default Main;