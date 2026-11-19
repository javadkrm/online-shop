import { createBrowserRouter } from "react-router-dom"
import ProductsList from "../features/products/components/productsList/ProductsList"
import Login from "../pages/panel/login/Login"
import Blog from "../pages/index/blog/Blog"
import Home from "../pages/index/home/Home"
import Cart from "../pages/index/Cart/Cart"
import Profile from "../pages/index/profile/Profile"
import ProductDetails from "../features/products/components/ProductDetails/ProductDetails"
import StoreLayout from "./layout/StoreLayout"
import PanelLayout from "./layout/PanelLayout"
import ProtectedRoute from "../components/auth/ProtectedRoutes"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <StoreLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'products', element: <ProductsList /> },
            { path: 'products/:id', element: <ProductDetails /> },
            { path: 'cart', element: <Cart /> },
            { path: 'blog', element: <Blog /> },

            {
                element: <ProtectedRoute allowedRoles={['user', 'admin']} />,
                children: [
                    { path: 'profile', element: <Profile /> }
                ]
            }
        ]
    },

    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/panel',
        element: <PanelLayout />,
        children: [
            {
                element: <ProtectedRoute allowedRoles={['admin']} />,
                children: [
                    {
                        index: true,
                        // element: <Dashboard />
                    },
                    {
                        path: 'products',
                        // element: <AdminProducts />
                    },
                    {
                        path: 'orders',
                        // element: <AdminOrders />
                    },
                    {
                        path: 'users',
                        // element: <AdminUsers />
                    }
                ]
            }
        ]
    }
])