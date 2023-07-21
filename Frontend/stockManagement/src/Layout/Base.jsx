import React from 'react'
import Sidebar from '../Partials/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Partials/Navbar'
import { useContext } from 'react'
import GlobalStateContext from '../Context/GlobalStateContext'
import Loader from '../Partials/Loader'

export default function Base() {


    return (
        <div className='flex h-full  w-full'>
            <Sidebar />
            <div className='flex flex-col space-y-3  w-full'>
                <div>
                    <Navbar />
                </div>
                <div className='mx-6'>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}
