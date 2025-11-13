import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import AllVehicleCard from '../Components/AllVehicleCard';
import Loading from '../Components/Loading';

const AllVehicles = () => {
    const [cars, setCars] = useState([])
    const { loading } = use(AuthContext)
    const [filteredCars, setFilteredCars] = useState([])
    const [filters, setFilters] = useState({
        category: '',
        location: '',
        priceRange: '',
    })

    useEffect(() => {
        axios.get(`https://travel-ease-server-psi.vercel.app/cars`)
            .then(data => {
                setCars(data.data)
                setFilteredCars(data.data) // Initialize filtered cars
            })
    }, [])

    useEffect(() => {
        applyFilters()
    }, [filters, cars])

    const applyFilters = () => {
        let result = [...cars]

        // Category filter
        if (filters.category) {
            result = result.filter(car => {
                const carCategory = car.category || ''
                return carCategory.toLowerCase() === filters.category.toLowerCase()
            })
        }

        // Location filter
        if (filters.location) {
            result = result.filter(car => {
                const carLocation = car.location || ''
                return carLocation.toLowerCase().includes(filters.location.toLowerCase()) // Fixed typo
            })
        }

        // Price Filter
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(str =>
                parseInt(str.replace(/[^0-9]/g, ''))
            )

            result = result.filter(car => {
                const carPrice = car.pricePerDay || 0
                return carPrice >= min && carPrice <= max
            })
        }
        setFilteredCars(result)
    }

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }

    const clearFilters = () => {
        setFilters({
            category: '',
            location: '',
            priceRange: ''
        })
    }

    return (
        <div className=''>
            <title>All Cars</title>
            <h1 className='text-3xl text-center mt-2'>All Vehicles</h1>
            
            {/* Filter fields */}
            <div className='mt-10 flex gap-5 ml-10 items-center'>
                {/* Category Filter */}
                <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)} // Fixed: added filter type
                    className="select select-neutral">
                    <option value=''>All Categories</option> {/* Changed to empty value */}
                    <option value='Sedan'>Sedan</option>
                    <option value='Electric'>Electric</option>
                    <option value='SUV'>SUV</option>
                    <option value='Van'>Van</option>
                </select>
                
                {/* Location Filter */}
                <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)} // Fixed: added filter type
                    className="select select-neutral">
                    <option value=''>All Locations</option> {/* Changed to empty value */}
                    <option value='Dhaka'>Dhaka</option>
                    <option value='Chittagong'>Chittagong</option>
                    <option value='Comilla'>Comilla</option>
                    <option value='Rajshahi'>Rajshahi</option>
                    <option value='Khulna'>Khulna</option>
                    <option value='Shylet'>Shylet</option>
                    <option value='Barishal'>Barishal</option>
                </select>
                
                {/* Price Filter */}
                <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)} // Fixed: added filter type
                    className="select select-neutral">
                    <option value=''>All Prices</option> {/* Changed to empty value */}
                    <option value='50-100'>$50 - $100</option>
                    <option value='100-150'>$100 - $150</option>
                    <option value='150-200'>$150 - $200</option>
                    <option value='200-300'>$200 - $300</option>
                    <option value='300-500'>$300 - $500</option>
                </select>
            </div>

            {/* Result count */}
            <div className='mt-4 ml-10 text-sm '>
                Showing {filteredCars.length} of {cars.length} vehicles
                {(filters.category || filters.location || filters.priceRange) && (
                    <span className='ml-2'>• <button onClick={clearFilters} className='link link-primary'>Clear Filters</button></span>
                )}
            </div>

            {/* Display active filters */}
            {(filters.category || filters.location || filters.priceRange) && (
                <div className='mt-2 ml-10 flex flex-wrap gap-2'>
                    {filters.category && (
                        <span className='badge badge-primary gap-2'>
                            Category: {filters.category} 
                            <button 
                                onClick={() => handleFilterChange('category', '')} 
                                className='hover:text-white'
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.location && (
                        <span className='badge badge-secondary gap-2'>
                            Location: {filters.location} 
                            <button 
                                onClick={() => handleFilterChange('location', '')} 
                                className='hover:text-white'
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.priceRange && (
                        <span className='badge badge-accent gap-2'>
                            Price: ${filters.priceRange.split('-')[0]} - ${filters.priceRange.split('-')[1]} 
                            <button 
                                onClick={() => handleFilterChange('priceRange', '')} // Fixed: was targeting category
                                className='hover:text-white'
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            )}

            {/* Vehicles Grid */}
            <div className='flex flex-wrap justify-center gap-5 mt-10 mb-10'>
                {
                    loading ?
                        <Loading></Loading> :
                        filteredCars.length > 0 ?
                            filteredCars.map(car => <AllVehicleCard key={car._id} car={car}></AllVehicleCard>) :
                            (
                                <div className="text-center py-10 w-full">
                                    <p className="text-lg text-gray-500 mb-4">No vehicles found matching your filters.</p>
                                    <button
                                        onClick={clearFilters}
                                        className="btn btn-primary"
                                    >
                                        Show All Vehicles
                                    </button>
                                </div>
                            )
                }
            </div>
        </div>
    );
};

export default AllVehicles;