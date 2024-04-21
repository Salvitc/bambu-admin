import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './pages/LoginPage.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Dashboard from './layout/Dashboard.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import User from './pages/User.tsx';
import Products from './pages/Products.tsx';
import Invoices from './pages/Invoices.tsx';
import Home from './pages/Home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: 
      <ProtectedRoute
        roleRequired='ADMIN'
      >
        <Dashboard />
      </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
