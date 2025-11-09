import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-horizontal footer-center bg-base-300  p-10">
                <aside>
                    <img className='w-[100px] h-[100px] rounded-full' src={'https://i.ibb.co.com/CsSDPqbC/Travel-Ease.png'} alt="TravelEase" />
                    <p className="font-bold">
                        TravelEase
                        <br />
                        Vehicle Booking & Trip Management Platform
                    </p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a target='_blank' href='https://www.facebook.com/'><FaFacebook size={24}/></a>
                        <a target='_blank' href='https://www.youtube.com/'><IoLogoYoutube size={24}/></a>
                        <a target='_blank' href='https://x.com/'><FaXTwitter size={24}/></a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;