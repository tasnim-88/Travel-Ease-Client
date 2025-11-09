import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <header className="sticky top-0 z-50 bg-base-100 shadow">
                <Navbar></Navbar>
            </header>
            <main className='grow'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;