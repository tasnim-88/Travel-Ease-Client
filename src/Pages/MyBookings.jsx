import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../Components/Loading';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = use(AuthContext);
    const userEmail = user?.email; 

    // console.log('Logged in user:', userEmail);
    // console.log('All bookings:', bookings);

    useEffect(() => {
        if (!userEmail) {
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:3000/my-bookings/${userEmail}`)
            .then(res => {
                setBookings(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching user bookings:', err);
                setError('Failed to load your bookings');
                setLoading(false);
            });
    }, [userEmail]);

    const handleCancelBooking = (bookingId) => {
        console.log('Cancel booking:', bookingId);
        axios.delete(`http://localhost:3000/bookings/${bookingId}`)
            .then(() => {
                setBookings(bookings.filter(booking => booking._id !== bookingId));
            })
            .catch(err => console.error('Error canceling booking:', err));
    };

    if (loading) {
        return <Loading></Loading>
    }

    if (error) {
        return (
            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    if (!userEmail) {
        return (
            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="text-center">
                    <p className="text-white text-2xl font-bold">Please log in</p>
                    <p className="text-[#9dabb9] mt-2">You need to be logged in to view your bookings.</p>
                </div>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="text-center">
                    <p className="text-white text-2xl font-bold">No bookings found</p>
                    <p className="text-[#9dabb9] mt-2">You haven't made any bookings yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                        <div className="flex min-w-72 flex-col gap-3">
                            <p className="text-white tracking-light text-2xl font-bold leading-tight">
                                My Bookings
                            </p>
                            <p className="text-[#9dabb9]">
                                {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found for {userEmail}
                            </p>
                        </div>
                    </div>

                    {/* Trip Cards */}
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id || booking.carId}
                                className="flex gap-4 bg-base-200 px-4 py-3 justify-between rounded-lg"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-[70px]">
                                        <img
                                            src={booking.coverImage}
                                            alt={booking.vehicleName}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center">
                                        <p className="text-base font-medium leading-normal">
                                            {booking.vehicleName}
                                        </p>
                                        <p className="text-[#9dabb9] text-sm font-normal leading-normal">
                                            Price: ${booking.pricePerDay}/day
                                        </p>
                                    </div>
                                </div>
                                <div className="shrink-0 flex items-center">
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#283039] text-white text-sm font-medium leading-normal w-fit hover:bg-red-600 transition-colors"
                                        onClick={() => handleCancelBooking(booking._id)}
                                    >
                                        <span className="truncate">Cancel Booking</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;