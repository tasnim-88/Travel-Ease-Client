import React, { use, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddVehicle = () => {
    const { user } = use(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleForm = async (e) => {
        e.preventDefault();

        if (!user?.email) {
            toast.error('Please log in to add a vehicle');
            return;
        }

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

            const response = await axios.post('https://travel-ease-server-psi.vercel.app/cars', vehicleData, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            });

            if (response.data.insertedId) {
                toast.success('Vehicle added successfully!');
                form.reset();
            }
        } catch (error) {
            console.error('Error adding vehicle:', error);
            toast.error('Failed to add vehicle. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <title>Add Vehicle</title>
            <div className="min-h-screen bg-base-100 p-10 flex justify-center">
                <div className="w-full max-w-3xl bg-base-200 shadow-xl rounded-2xl p-8">
                    <h1 className="text-3xl font-bold mb-8">Add Your Vehicle</h1>

                    <form onSubmit={handleForm} className="space-y-6">

                        {/* Vehicle Name */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Vehicle Name</span>
                            </label>
                            <input
                                type="text"
                                name='vehicle'
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
                                defaultValue=""
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
                                defaultValue="Available"
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
                                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-3 bg-orange-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-orange-700 transition"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Adding Vehicle...
                                    </>
                                ) : (
                                    'Submit Vehicle'
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVehicle;