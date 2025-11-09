import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Components/Home";
import Signin from "../Pages/Signin";
import Registration from "../Pages/Registration";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyProfile from "../Pages/MyProfile";
import MyBookings from "../Pages/MyBookings";
import AddVehicle from "../Pages/AddVehicle";
import MyVehicle from "../Pages/MyVehicle";
import UpdateVehicle from "../Pages/UpdateVehicle";
import AllVehicles from "../Pages/AllVehicles";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            // {path: '/about',},
            { path: '/signin', Component: Signin },
            { path: '/registration', Component: Registration },
            { path: '/allVehicles', Component: AllVehicles },
            {
                path: '/myprofile',
                element: <PrivateRoute>
                    <MyProfile></MyProfile>
                </PrivateRoute>
            },
            {
                path: '/myBookings',
                element: <PrivateRoute>
                    <MyBookings></MyBookings>
                </PrivateRoute>
            },
            {
                path: '/addVehicle',
                element: <PrivateRoute>
                    <AddVehicle></AddVehicle>
                </PrivateRoute>
            },
            {
                path: '/myVehicle',
                element: <PrivateRoute>
                    <MyVehicle></MyVehicle>
                </PrivateRoute>
            },
            {
                path: '/updateVehicle',
                element: <PrivateRoute>
                    <UpdateVehicle></UpdateVehicle>
                </PrivateRoute>
            },
        ]
    }
])

export default router