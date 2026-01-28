import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Landing from '../pages/Landing';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import Dashboard from '../pages/dashboard/Dashboard';
import Products from '../pages/dashboard/Products';
import Warehouses from '../pages/dashboard/Warehouses';
import StockLevels from '../pages/dashboard/StockLevels';
import Reports from '../pages/dashboard/Reports';
import Support from '../pages/dashboard/Support';
import Settings from '../pages/dashboard/Settings';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
    {
        element: <PublicRoute />,
        children: [
            {
                path: '/login',
                element: <SignIn />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard />,
                    },
                    {
                        path: '/inventory',
                        element: <Products />,
                    },
                    {
                        path: '/products',
                        element: <Navigate to="/inventory" replace />,
                    },
                    {
                        path: '/warehouses',
                        element: <Warehouses />,
                    },
                    {
                        path: '/stock',
                        element: <StockLevels />,
                    },
                    {
                        path: '/reports',
                        element: <Reports />,
                    },
                    {
                        path: '/support',
                        element: <Support />,
                    },
                    {
                        path: '/settings',
                        element: <Settings />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);
