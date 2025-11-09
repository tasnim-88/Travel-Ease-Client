import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Components/Home";
import Signin from "../Pages/Signin";
import Registration from "../Pages/Registration";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyProfile from "../Pages/MyProfile";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            // {path: '/about',},
            { path: '/signin', Component: Signin },
            { path: '/registration', Component: Registration },
            {
                path: '/myprofile',
                element: <PrivateRoute>
                    <MyProfile></MyProfile>
                </PrivateRoute>
            }
        ]
    }
])

export default router