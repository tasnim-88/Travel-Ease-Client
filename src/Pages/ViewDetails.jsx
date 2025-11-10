import React from 'react';

const ViewDetails = () => {
    return (
        <div>
            <div className="min-h-screen bg-base-100 flex justify-center p-6">
                <div className="w-full max-w-4xl bg-base-200 shadow-xl rounded-2xl p-6">
                    <img
                        src="/images/bmw-i4.jpg"
                        alt="BMW i4"
                        className="w-full h-80 object-cover rounded-xl mb-6"
                    />


                    <h1 className="text-3xl font-bold mb-2">BMW i4</h1>
                    <p className="text-sm text-gray-400 mb-6">
                        Premium electric sedan with fast acceleration and luxury interior.
                    </p>


                    <h2 className="text-lg font-semibold mb-3">Vehicle Details</h2>


                    <div className="overflow-x-auto mb-6">
                        <table className="table w-full">
                            <tbody>
                                <tr>
                                    <th>Owner</th>
                                    <td>Zahid Hossain</td>
                                </tr>
                                <tr>
                                    <th>Category</th>
                                    <td>Electric</td>
                                </tr>
                                <tr>
                                    <th>Location</th>
                                    <td>Dhaka, Bangladesh</td>
                                </tr>
                                <tr>
                                    <th>Availability</th>
                                    <td>Available</td>
                                </tr>
                                <tr>
                                    <th>Price per day</th>
                                    <td>$200</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="flex justify-end">
                        <button className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;