import { createBrowserRouter } from "react-router-dom"
import ProductsList from "../features/products/components/productsList/ProductsList"
import Login from "../pages/panel/login/Login"
import Blog from "../pages/index/blog/Blog"
import Home from "../pages/index/home/Home"
import Cart from "../pages/index/Cart/Cart"
import Profile from "../pages/index/profile/Profile"
import Dashboard from "../pages/index/dashboard/Dashboard"
import ProductDetails from "../features/products/components/ProductDetails/ProductDetails"
import StoreLayout from "./layout/StoreLayout"
import PanelLayout, { PanelSection } from "./layout/panelLayout/PanelLayout"
import ProtectedRoute from "../components/auth/ProtectedRoutes"
import Register from "../pages/panel/register/Register"
import BlogDetails from "../pages/index/blogDetails/BlogDetails"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <StoreLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'products', element: <ProductsList /> },
            { path: 'products/category/:category', element: <ProductsList /> },
            { path: 'products/:id', element: <ProductDetails /> },
            { path: 'cart', element: <Cart /> },
            { path: 'blog', element: <Blog /> },
            { path: 'blog/:id', element: <BlogDetails /> },

            {
                element: <ProtectedRoute allowedRoles={['user', 'admin']} />,
                children: [
                    { path: 'profile', element: <Profile /> },
                    { path: 'dashboard', element: <Dashboard /> }
                ]
            }
        ]
    },

    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
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
                        element: <PanelSection section="dashboard" />
                    },
                    {
                        path: 'products',
                        element: <PanelSection section="products" />
                    },
                    {
                        path: 'orders',
                        element: <PanelSection section="orders" />
                    },
                    {
                        path: 'users',
                        element: <PanelSection section="users" />
                    },
                    {
                        path: 'categories',
                        element: <PanelSection section="categories" />
                    },
                    {
                        path: 'comments',
                        element: <PanelSection section="comments" />
                    },
                    {
                        path: 'reports',
                        element: <PanelSection section="reports" />
                    },
                    {
                        path: 'settings',
                        element: <PanelSection section="settings" />
                    },
                ]
            }
        ]
    }
])