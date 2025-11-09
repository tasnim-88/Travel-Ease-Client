import axios from 'axios';
import React, { useEffect, useState } from 'react';


const LatestVehicles = () => {
    const [allCars, setAllCars] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/cars`)
            .then(data => {
                console.log('axios data', data.data);
                setAllCars(data.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-white mb-4">Latest Vehicles</h1>
            {allCars.map((car) => (
                <div key={car._id} className="bg-base-200 glass rounded-2xl p-5 w-56  shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer relative">
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <img
                                src={car.coverImage}
                                alt={car.vehicleName}
                                className="w-full object-contain h-28 mx-auto"
                            />
                        </div>
                        <h2 className=" text-lg font-semibold mt-2 mb-2">
                            {car.vehicleName}
                        </h2>
                        <p className="">${car.pricePerDay} /day</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LatestVehicles;
