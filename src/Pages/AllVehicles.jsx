import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import AllVehicleCard from '../Components/AllVehicleCard';
import Loading from '../Components/Loading';

const AllVehicles = () => {

    const [cars, setCars] = useState([])
    const { loading } = use(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3000/cars`)
            .then(data => {
                setCars(data.data)
            })
    }, [])



    return (
        <div className=''>
            <h1 className='text-3xl text-center mt-2'>All Vehicles</h1>
            {/* Sorting fields */}
            <div className=' mt-10 flex gap-5 ml-10'>
                {/* 1 */}
                <select defaultValue="Category" className="select select-neutral">
                    <option disabled={true}>Category</option>
                    <option>Sedan</option>
                    <option>Electric</option>
                    <option>SUV</option>
                    <option>Van</option>
                </select>
                {/* 2 */}
                <select defaultValue="Location" className="select select-neutral">
                    <option disabled={true}>Location</option>
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Comilla</option>
                    <option>Rajshahi</option>
                    <option>Khulna</option>
                    <option>Shylet</option>
                    <option>Barishal</option>
                </select>
                {/* 3 */}
                <select defaultValue="Price" className="select select-neutral">
                    <option disabled={true}>Price</option>
                    <option>$50 - $100</option>
                    <option>$100 - $150</option>
                    <option>$150 - $200</option>
                </select>

            </div>
            <div className='flex flex-wrap justify-center gap-5 mt-10 mb-10'>
                {
                    loading ?
                        <Loading></Loading> :
                        cars.map(car => <AllVehicleCard key={car._id} car={car}></AllVehicleCard>)
                }
            </div>
        </div>
    );
};

export default AllVehicles;