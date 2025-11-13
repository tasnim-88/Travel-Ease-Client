import React from 'react';
import { Link } from 'react-router';

const AllVehicleCard = ({ car }) => {
    // console.log(car);

    const { _id } = car

    return (
        <div>
            
            <div className="bg-base-200 glass rounded-2xl p-5 w-56  shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer relative">
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
                    <Link to={`/viewDetails/${_id}`} className='btn mt-2 hover:scale-105'>View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default AllVehicleCard;