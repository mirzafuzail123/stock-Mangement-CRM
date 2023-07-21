import React from 'react'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Login from '../Auth/Login'
import Home from '../Home/Components/Home'
import InventoryList from '../Inventory/InventoryList/InventoryList'
import Base from '../Layout/Base'
import PurchaseList from '../Purchase/PurchaseList/PuchaseList'
import OnlineReturn from '../Return/Online/OnlineReturn'
import PosReturn from '../Return/POS/PosReturn'
import OnlineSales from '../Sales/Online/OnlineSales'
import PosSales from '../Sales/POS/PosSales'
import SupplierList from '../Suppliers/SupplierList/SupplierList'
import UserList from '../Users/UserList/UserList'

export default function Router() {

    const customRouter = createBrowserRouter([
        {
            path: "/",
            element: <Base />,
            loader: () => {
                if (!localStorage.getItem('authToken')) {
                    throw redirect('/login')
                }
                return null
            },
            children: [
                // Home
                {
                    path: "/",
                    element: <Home />
                },
                // User List
                {
                    path: '/users',
                    element: <UserList />
                },
                // Inventory
                {
                    path: '/inventory',
                    element: <InventoryList />
                },
                {
                    path: '/purchase',
                    element: <PurchaseList />
                },
                // Sales
                {
                    path: '/sales/pos',
                    element: <PosSales />,
                    loader: () => {
                        const userRole = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).userType
                        if (userRole === 'Admin' || userRole === "POS seller") {
                            return null
                        }
                        else {
                            throw redirect('/')
                        }
                    }
                },
                {
                    path: '/sales/online',
                    element: <OnlineSales />,
                    loader: () => {
                        const userRole = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).userType
                        if (userRole === 'Admin' || userRole === "Online seller") {
                            return null
                        }
                        else {
                            throw redirect('/')
                        }
                    }
                },
                // Return
                {
                    path: '/return/pos',
                    element: <PosReturn />,
                    loader: () => {
                        const userRole = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).userType
                        if (userRole === 'Admin' || userRole === "POS seller") {
                            return null
                        }
                        else {
                            throw redirect('/')
                        }
                    }
                },
                {
                    path: '/return/online',
                    element: <OnlineReturn />,
                    loader: () => {
                        const userRole = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).userType
                        if (userRole === 'Admin' || userRole === "Online seller") {
                            return null
                        }
                        else {
                            throw redirect('/')
                        }
                    }
                },
                // Supplier
                {
                    path: '/supplier',
                    element: <SupplierList />
                },
            ]
        },

        {
            path: "/login",
            element: <Login />,
            loader: () => {
                if (localStorage.getItem('authToken')) {
                    throw redirect('/')
                }
                return null
            }
        }
    ])
    return (
        <RouterProvider router={customRouter} />
    )
}
