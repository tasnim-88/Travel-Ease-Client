import React from 'react';

const AddVehicle = () => {
    return (
        <div>
            <div className="min-h-screen bg-base-100 p-10 flex justify-center">
                <div className="w-full max-w-3xl bg-base-200 shadow-xl rounded-2xl p-8">
                    <h1 className="text-3xl font-bold mb-8">Add Your Vehicle</h1>

                    <form className="space-y-6">

                        {/* Vehicle Name */}
                        <div className="form-control">
                            <label className=" block mb-2">
                                <span className="label-text">Vehicle Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter vehicle name"
                                className="input input-bordered"
                            />
                        </div>

                        {/* Owner Name */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Owner Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter owner name"
                                className="input input-bordered"
                            />
                        </div>

                        {/* Category */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Category</span>
                            </label>
                            <select className="select select-bordered">
                                <option disabled selected>
                                    Select category
                                </option>
                                <option>Electric</option>
                                <option>Sedan</option>
                                <option>Sports</option>
                                <option>SUV</option>
                            </select>
                        </div>

                        {/* Price Per Day */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Price Per Day</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter price per day"
                                className="input input-bordered"
                            />
                        </div>

                        {/* Location */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter location"
                                className="input input-bordered"
                            />
                        </div>

                        {/* Availability */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Availability</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter availability"
                                className="input input-bordered"
                            />
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-32"
                                placeholder="Enter description"
                            ></textarea>
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="input input-bordered"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="block mb-2">
                                <span className="label-text">Cover Image</span>
                            </label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button className="btn btn-primary">Submit Vehicle</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVehicle;