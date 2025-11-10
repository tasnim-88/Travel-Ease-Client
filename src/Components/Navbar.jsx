import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { ClockLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, setUser, signout, loading } = use(AuthContext)
    // console.log(user, loading);

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.querySelector("html").setAttribute("data-theme", savedTheme);
        return savedTheme;
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);


    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };


    const handleSignOut = () => {
        signout()
            .then(() => {
                toast.success("Successfully signed out")
                setUser(null)
            }).catch(err => {
                toast.error(err.code)
            })
    }

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/allVehicles'}>All Vehicles</NavLink></li>

    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm px-10">
                <div className="navbar-start">
                    {/* <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div> */}
                    <a>
                        <img className='w-[60px] h-[60px] rounded-full bg-transparent' src={'https://i.ibb.co.com/CsSDPqbC/Travel-Ease.png'} alt="TravelEase" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                {
                    loading ?
                        (<div className='navbar-end'><ClockLoader size={30} /></div>) : (
                            <div className='navbar-end flex items-center gap-3'>
                                <input
                                    onChange={(e) => handleTheme(e.target.checked)}
                                    type="checkbox"
                                    defaultChecked={localStorage.getItem('theme') === "dark"}
                                    className="toggle" />
                                {
                                    user ? (
                                        <div className="dropdown dropdown-end dropdown-bottom ">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                <div className="w-10 rounded-full">
                                                    <img
                                                        alt="Tailwind CSS Navbar component"
                                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                </div>
                                            </div>
                                            <ul
                                                tabIndex="-1"
                                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                                {
                                                    user &&
                                                    <>
                                                        <li>
                                                            <NavLink to={'/myprofile'} className="justify-between">
                                                                Profile
                                                                <span className="badge">New</span>
                                                            </NavLink>
                                                        </li>
                                                        <li><NavLink to={'/myBookings'}>My Bookings</NavLink></li>
                                                        <li><NavLink to={'/addVehicle'}>Add Vehicle</NavLink></li>
                                                        <li><NavLink to={'/myVehicle'}>My Vehicle</NavLink></li>
                                                        <li><NavLink to={'/updateVehicle'}>Update Vehicle</NavLink></li>
                                                    </>
                                                }
                                                <li><Link to={'/signin'} onClick={handleSignOut}>Logout</Link></li>
                                            </ul>
                                        </div>
                                    ) :
                                        <div className="">
                                            <Link to={'/signin'} className="btn">Login/Register</Link>
                                        </div>
                                }
                            </div>
                        )

                }


            </div>
        </div>
    );
};

export default Navbar;