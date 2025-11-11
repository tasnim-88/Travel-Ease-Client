import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router';
import axios from 'axios';
import Loading from '../Components/Loading';
import { toast } from 'react-toastify';
import { useSpring } from '@react-spring/web';

const DeleteModal = ({ isOpen, onClose, onConfirm, vehicleName }) => {
    const animation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scale(1)' : 'scale(0.8)',
        config: { tension: 300, friction: 20 }
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <animated.div style={animation} className="bg-base-100 p-6 rounded-2xl shadow-xl max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                <p className="text-gray-400 mb-6">
                    Are you sure you want to delete <span className="font-semibold text-white">{vehicleName}</span>?
                    This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="btn btn-ghost"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="btn btn-error"
                    >
                        Delete
                    </button>
                </div>
            </animated.div>
        </div>
    );
};

const MyVehicle = () => {
    const { user } = use(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        vehicleId: null,
        vehicleName: ''
    });

    useEffect(() => {
        const fetchVehicles = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const response = await axios.get(`http://localhost:3000/my-vehicle/${user.email}`);

                // const userVehicles = response.data.filter(car => car.userEmail === user.email);
                setVehicles(response.data);

            } catch (err) {
                console.error('Error fetching vehicles:', err);
                toast.error('Failed to load vehicles');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [user]);

    const handleDeleteClick = (vehicleId, vehicleName) => {
        setDeleteModal({
            isOpen: true,
            vehicleId,
            vehicleName
        });
    };

    // Confirm delete action
    const handleConfirmDelete = async () => {
        if (!deleteModal.vehicleId) return;

        try {
            const response = await axios.delete(`http://localhost:3000/cars/${deleteModal.vehicleId}`);

            if (response.data.success) {
                toast.success('Vehicle deleted successfully!');
                setVehicles(prev => prev.filter(vehicle => vehicle._id !== deleteModal.vehicleId));
            }
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            toast.error('Failed to delete vehicle. Please try again.');
        } finally {
            setDeleteModal({ isOpen: false, vehicleId: null, vehicleName: '' });
        }
    };

    const handleCloseModal = () => {
        setDeleteModal({ isOpen: false, vehicleId: null, vehicleName: '' });
    };

    // Show loading state
    if (loading) {
        return <Loading />;
    }


    // Show empty state if no vehicles
    if (vehicles.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-bold mb-4">No vehicles found</p>
                    <p className="text-gray-500 mb-4">You haven't added any vehicles yet.</p>
                    <Link to="/addVehicle" className="btn btn-primary">
                        Add Your First Vehicle
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-base-100 py-8'>
            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                vehicleName={deleteModal.vehicleName}
            />

            <div className='container mx-auto px-4'>
                <h1 className='text-3xl font-bold text-center mb-8'>My Vehicles</h1>

                <div className="overflow-x-auto bg-base-200 rounded-lg shadow-lg">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-300">
                                <th>Vehicle</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map(vehicle => (
                                <tr key={vehicle._id} className="hover:bg-base-300">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-lg">
                                                    <img
                                                        src={vehicle.coverImage || "/images/default-car.jpg"}
                                                        alt={vehicle.vehicleName}
                                                        className="object-cover w-full h-full rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{vehicle.vehicleName}</div>
                                                <div className="text-sm text-gray-500">{vehicle.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-outline">{vehicle.category}</span>
                                    </td>
                                    <td>
                                        <span className="font-semibold">${vehicle.pricePerDay}</span>
                                        <span className="text-sm text-gray-500">/day</span>
                                    </td>
                                    <td>
                                        <span className={`badge ${vehicle.availability === 'Available' ? 'badge-success' : 'badge-error'}`}>
                                            {vehicle.availability}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/viewDetails/${vehicle._id}`}
                                                className="btn btn-info btn-sm"
                                            >
                                                Details
                                            </Link>
                                            <Link
                                                to={`/updateVehicle/${vehicle._id}`}
                                                className="btn btn-success btn-sm"
                                            >
                                                Update
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(vehicle._id, vehicle.vehicleName)}
                                                className="btn btn-error btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyVehicle;