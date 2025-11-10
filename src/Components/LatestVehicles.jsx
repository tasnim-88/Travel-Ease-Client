import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';

const LatestVehicles = () => {
    const [allCars, setAllCars] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/latestVehicle`)
            .then(data => {
                console.log('axios data', data.data);
                setAllCars(data.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 bg-base-100">
            <h1 className="text-2xl font-bold mb-6">Latest Vehicles</h1>
            
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                // pagination={{ 
                //     clickable: true,
                //     dynamicBullets: true 
                // }}
                autoplay={{ 
                    delay: 3000,
                    disableOnInteraction: false 
                }}
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 3,
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 4,
                    },
                    // when window width is >= 1280px
                    1280: {
                        slidesPerView: 5,
                    },
                }}
                className="mySwiper"
            >
                {allCars.map((car) => (
                    <SwiperSlide key={car._id}>
                        <div className="bg-base-200 glass rounded-2xl p-5 w-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer relative h-full">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <img
                                        src={car.coverImage}
                                        alt={car.vehicleName}
                                        className="w-full object-contain h-28 mx-auto mb-4"
                                    />
                                </div>
                                <div className="grow">
                                    <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                                        {car.vehicleName}
                                    </h2>
                                    <p className="">${car.pricePerDay} /day</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default LatestVehicles;