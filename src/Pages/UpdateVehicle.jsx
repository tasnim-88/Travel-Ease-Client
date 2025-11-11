import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router';

const UpdateVehicle = () => {
    const { user } = use(AuthContext);
    const [loading, setLoading] = useState(false);
    const [carData, setCarData] = useState([])
    const { id } = useParams()

    console.log(carData);
    

    useEffect(() => {
        axios.get(`http://localhost:3000/updateVehicle/${id}`)
            .then(res => {
                setCarData(res.data)
            })
    }, [id])

    const handleForm = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const form = e.target;
            const vehicleData = {
                vehicleName: form.vehicle.value,
                owner: form.name.value,
                category: form.category.value,
                pricePerDay: parseFloat(form.price.value),
                location: form.location.value,
                availability: form.status.value || 'Available',
                description: form.area.value,
                coverImage: form.image.value,
                userEmail: user.email,
                createdAt: new Date().toISOString()
            };

            // Validate required fields
            const requiredFields = ['vehicleName', 'owner', 'category', 'pricePerDay', 'location', 'description'];
            for (const field of requiredFields) {
                if (!vehicleData[field]) {
                    toast.error('Please fill in all required fields');
                    setLoading(false);
                    return;
                }
            }

            const response = await axios.put(`http://localhost:3000/cars/${id}`, vehicleData);
            console.log(response);
            

            if (response.data.success) {
                toast.success('Vehicle updated successfully!');
                form.reset();
            }
        } catch (error) {
            console.error('Error updating vehicle:', error);
            toast.error('Failed to update vehicle. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-base-100 p-10 flex justify-center">
                <div className="w-full max-w-3xl bg-base-200 shadow-xl rounded-2xl p-8">
                    <h1 className="text-3xl font-bold mb-8">Update Vehicle</h1>

                    <form onSubmit={handleForm} className="space-y-6">

                        {/* Vehicle Name */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Vehicle Name</span>
                            </label>
                            <input
                                type="text"
                                name='vehicle'
                                defaultValue={carData.vehicleName}
                                placeholder="Enter vehicle name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Owner Name */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Owner Name</span>
                            </label>
                            <input
                                type="text"
                                name='name'
                                defaultValue={carData.owner}
                                placeholder="Enter owner name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Category</span>
                            </label>
                            <select
                                name='category'
                                className="select select-bordered w-full"
                                required
                                defaultValue={carData.category}
                            >
                                <option value="" disabled>Select category</option>
                                <option value="Electric">Electric</option>
                                <option value="Sedan">Sedan</option>
                                <option value="Van">Van</option>
                                <option value="SUV">SUV</option>
                            </select>
                        </div>

                        {/* Price Per Day */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Price Per Day ($)</span>
                            </label>
                            <input
                                type="number"
                                name='price'
                                defaultValue={carData.pricePerDay}
                                placeholder="Enter price per day"
                                className="input input-bordered w-full"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                name='location'
                                defaultValue={carData.location}
                                placeholder="Enter location"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Availability */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Availability</span>
                            </label>
                            <select
                                name='status'
                                className="select select-bordered w-full"
                                defaultValue={carData.availability}
                            >
                                <option value="Available">Available</option>
                                <option value="Not Available">Not Available</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name='area'
                                defaultValue={carData.description}
                                className="textarea textarea-bordered h-32 w-full"
                                placeholder="Enter vehicle description, features, and specifications"
                                required
                            ></textarea>
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                defaultValue={user?.email || ''}
                                className="input input-bordered w-full"

                                readOnly
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Cover Image URL</span>
                            </label>
                            <input
                                type="url"
                                name='image'
                                defaultValue={carData.coverImage}
                                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Adding Vehicle...
                                    </>
                                ) : (
                                    'Update Vehicle'
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateVehicle;