import React from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const RootLayout = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div className='flex flex-col min-h-screen'>
            <header className="sticky top-0 z-50 bg-base-100 shadow">
                <Navbar></Navbar>
                <motion.div 
                    className="h-1 bg-primary origin-left"
                    style={{ scaleX: scrollYProgress }}
                />
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