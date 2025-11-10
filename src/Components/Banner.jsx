import React from 'react';
import video from '../assets/8562464-hd_1920_1080_30fps.mp4'
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className='relative flex justify-center items-center'>
            <video src={video} autoPlay muted loop></video>
            <div className='absolute space-y-3'>
                <h1 className='text-white text-6xl text-center'>Your Journey Starts Here</h1>
                <p className='text-white text-center text-xl'>Find the perfect vehicle for your next adventure <br /> Explore our wide selection of cars, trucks, and SUVs</p>
                <div className='flex justify-center items-center'>
                    <Link to={'/allVehicles'} className='btn'>Explore All Vehicle</Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;