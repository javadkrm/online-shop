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

export const router = createBrowserRouter([
    // storeFront
    {
        path: '/',
        element: <StoreLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'products',
                element: <ProductsList />,
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'products/:id',
                element: <ProductDetails />
            },
            {
                path: '/products',
                element: <ProductsList />
            },
            {
                path: '/blog',
                element: <Blog />
            }
        ]
    },

    // Authentication 
    {
        path: '/login',
        element: <Login />
    },

    // Admin Panel
    {
        path: '/panel',
        element: <PanelLayout />,
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
    },

])