import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../Components/Loading';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

const ViewDetails = () => {
    const { user } = use(AuthContext)
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingLoading, setBookingLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            setError('No car ID provided');
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:3000/viewDetails/${id}`)
            .then(response => {
                setCar(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching car details:', err);
                setError('Failed to load car details');
                setLoading(false);
            });
    }, [id]);

    const handleBookNow = async () => {
        if (!car) return;

        setBookingLoading(true);
        try {
            const currentDate = new Date();
            const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

            const bookingData = {
                carId: id,
                vehicleName: car.vehicleName,
                owner: car.owner,
                userEmail: user.email,
                pricePerDay: car.pricePerDay,
                location: car.location,
                coverImage: car.coverImage,
                category: car.category,
                bookingDate: formattedDate,
                bookingDateISO: currentDate.toISOString(),
                status: 'pending',
                pickupDate: format(currentDate, 'yyyy-MM-dd'),
                returnDate: format(new Date(currentDate.setDate(currentDate.getDate() + 1)), 'yyyy-MM-dd'),
                totalAmount: car.pricePerDay,
                bookingReference: `BK-${Date.now()}`
            };

            const response = await axios.post('http://localhost:3000/bookings', bookingData);

            if (response.data.insertedId) {

                const readableDate = format(parseISO(bookingData.bookingDateISO), 'PPPP pp');
                toast.success(`Booking request submitted successfully on ${readableDate}!`);
                setCar(prev => ({ ...prev, availability: 'Booked' }));
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error('Failed to submit booking request. Please try again.');
        } finally {
            setBookingLoading(false);
        }
    };

    const formatCarDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return format(parseISO(dateString), 'MMM dd, yyyy');
        } catch (error) {
            console.log(error.code);
            return 'Invalid date';
        }
    };

    if (loading) {
        return <Loading></Loading>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-base-100 flex justify-center items-center">
                <div className="alert alert-error max-w-md">
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="min-h-screen bg-base-100 flex justify-center items-center">
                <div className="alert alert-warning max-w-md">
                    <span>Car not found</span>
                </div>
            </div>
        );
    }

    const { vehicleName, userEmail, pricePerDay, owner, location, description, coverImage, category, availability, createdAt } = car;

    return (
        <div>
            <div className="min-h-screen bg-base-100 flex justify-center p-6">
                <div className="w-full max-w-4xl bg-base-200 shadow-xl rounded-2xl p-6">
                    <img
                        src={coverImage || "/images/default-car.jpg"}
                        alt={vehicleName}
                        className="w-full h-96 object-cover rounded-xl mb-6"
                    />

                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{vehicleName}</h1>
                            <p className="text-sm text-gray-400">
                                Listed on {formatCarDate(createdAt)}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-primary">${pricePerDay}<span className="text-sm font-normal text-gray-400">/day</span></div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-6">
                        {description}
                    </p>

                    <h2 className="text-lg font-semibold mb-3">Vehicle Details</h2>

                    <div className="overflow-x-auto mb-6">
                        <table className="table w-full">
                            <tbody>
                                <tr>
                                    <th className="bg-base-300">Owner</th>
                                    <td>{owner}</td>
                                </tr>
                                <tr>
                                    <th className="bg-base-300">Email</th>
                                    <td>{userEmail}</td>
                                </tr>
                                <tr>
                                    <th className="bg-base-300">Category</th>
                                    <td>
                                        <span className="badge badge-outline">{category}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="bg-base-300">Location</th>
                                    <td>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {location}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="bg-base-300">Availability</th>
                                    <td>
                                        <span className={`badge ${availability === 'Available' ? 'badge-success' : 'badge-error'}`}>
                                            {availability}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="bg-base-300">Price</th>
                                    <td className="text-lg font-semibold">${pricePerDay} / day</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-base-300 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold mb-2">Booking Information</h3>
                        <p className="text-sm text-gray-400">
                            Your booking will be confirmed immediately. You can pick up the vehicle from {location}.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleBookNow}
                            disabled={bookingLoading || availability !== 'Available'}
                        >
                            {bookingLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Processing Booking...
                                </>
                            ) : (
                                availability === 'Available' ? 'Book Now' : 'Not Available'
                                
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;