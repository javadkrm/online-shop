import { createBrowserRouter } from "react-router-dom"
import ProductsList from "../features/products/components/productsList/ProductsList"
import Login from "../pages/login/Login"
import Blog from "../pages/blog/Blog"
import MainLayout from "./layout/MainLayout"
import Home from "../pages/home/Home"
import Cart from "../pages/Cart/Cart"
import Profile from "../pages/profile/Profile"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/products',
                element: <ProductsList />,
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/profile',
                element: <Profile />
            }
        ]
    },
    {
        path: '/products',
        element: <ProductsList />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/blog',
        element: <Blog />
    }

])