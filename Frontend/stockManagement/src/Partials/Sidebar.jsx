import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight, faUser } from "@fortawesome/free-solid-svg-icons";
import AgencyLogo from '../assets/AgencyLogo.png'
import GlobalStateContext from "../Context/GlobalStateContext"

export default function Sidebar() {

    const location = useLocation()
    const navigate = useNavigate()
    const { setSelectedStore } = useContext(GlobalStateContext)

    const [OpenSaleLinks, setOpenSaleLinks] = useState(false)
    const [OpenReturnLinks, setOpenReturnLinks] = useState(false)

    const userRole = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).userType


    return (
        <>
            <aside className="flex flex-col  min-h-screen p-3 bg-white shadow-lg w-64   ">
                <div className="space-y-3">
                    {/* Logo */}
                    <Link className='flex items-center px-2'>
                        <img src={AgencyLogo} className='xs:h-10 xs:w-32 lg:h-14 lg:w-40' alt="" />
                    </Link>

                    <div className="flex-1 ">
                        <ul className="pt-4 pb-4 space-y-1 text-sm ">
                            {/* Home */}
                            <li className={`rounded-sm hover:text-primary ${location.pathname === "/" && "text-primary"}`}>
                                <Link
                                    to="/"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <span>Home</span>
                                </Link>
                            </li>

                            {/* Inventory */}
                            <li className={`rounded-sm hover:text-primary ${location.pathname === "/inventory" && "text-primary"}`}>
                                <Link
                                    to={"/inventory"}
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    <span>Inventory</span>
                                </Link>
                            </li>

                            {/* Purchase */}
                            <li className={`rounded-sm hover:text-primary ${location.pathname === "/purchase" && "text-primary"}`}>
                                <Link
                                    to={"/purchase"}
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path d="M3 6h2l1.79 9.47A2 2 0 008.68 18H19a2 2 0 100-4h-9M9 22a2 2 0 100-4h-3a2 2 0 100 4h3zm9-9a2 2 0 100-4 2 2 0 000 4zm-9-4a2 2 0 11-4 0 2 2 0 014 0zM15 5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>


                                    <span>Purchase</span>
                                </Link>
                            </li>

                            {/* Sale */}
                            <li className={`rounded-sm  ${location.pathname.includes("/sales") && "text-primary"}`}>
                                <div className="flex  p-2 space-x-3 rounded-md cursor-pointer">
                                    {/* Logo */}
                                    <svg
                                        onClick={() => setOpenSaleLinks(!OpenSaleLinks)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 relative bottom-[3px]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    {/* Links */}
                                    <div className='flex  w-full flex-col space-y-3'>
                                        <span className='' onClick={() => setOpenSaleLinks(!OpenSaleLinks)}>Sales</span>
                                        {OpenSaleLinks &&
                                            <>
                                                {(userRole === "Admin" || userRole === 'POS seller') && <Link to="/sales/pos" className={`dropdown_animation  ${location.pathname === "/sales/pos" ? 'text-primary' : 'text-gray-500'}  text-xs cursor-pointer hover:text-primary `}>POS</Link>}
                                                {(userRole === "Admin" || userRole === 'Online seller') && <Link to="/sales/online" className={`dropdown_animation  ${location.pathname === '/sales/online' ? 'text-primary' : 'text-gray-500'} text-xs cursor-pointer hover:text-primary `}>Online</Link>}
                                            </>
                                        }
                                    </div>
                                    {/* Menu Icon */}
                                    <FontAwesomeIcon onClick={() => setOpenSaleLinks(!OpenSaleLinks)} icon={OpenSaleLinks ? faAngleDown : faAngleRight} className='text-xs  pt-1 text-gray-400 cursor-pointer' />
                                </div>
                            </li>

                            {/* Return */}
                            <li className={`rounded-sm  ${location.pathname.includes("/return") && "text-primary"}`}>
                                <div className="flex  p-2 space-x-3 rounded-md cursor-pointer">
                                    {/* Logo */}
                                    <svg onClick={() => setOpenReturnLinks(!OpenReturnLinks)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2L2 12l10 10 10-10L12 2zm4 10h-4M7 12h4" />
                                    </svg>
                                    {/* Links */}
                                    <div className='flex  w-full flex-col space-y-3'>
                                        <span className='' onClick={() => setOpenReturnLinks(!OpenReturnLinks)}>Return</span>
                                        {OpenReturnLinks &&
                                            <>
                                                {(userRole === "Admin" || userRole === 'POS seller') && <Link to="/return/pos" className={`dropdown_animation  ${location.pathname === '/return/pos' ? 'text-primary' : 'text-gray-500'}  text-xs cursor-pointer hover:text-primary `}>POS </Link>}
                                                {(userRole === "Admin" || userRole === 'Online seller') && <Link to="/return/online" className={`dropdown_animation  ${location.pathname === '/return/online' ? 'text-primary' : 'text-gray-500'} text-xs cursor-pointer hover:text-primary `}>Online </Link>}
                                            </>
                                        }
                                    </div>
                                    {/* Menu Icon */}
                                    <FontAwesomeIcon onClick={() => setOpenReturnLinks(!OpenReturnLinks)} icon={OpenReturnLinks ? faAngleDown : faAngleRight} className='text-xs  pt-1 text-gray-400 cursor-pointer' />
                                </div>
                            </li>

                            {/* Supllier */}
                            <li className={`rounded-sm hover:text-primary ${location.pathname === "/supplier" && "text-primary"}`}>
                                <Link
                                    to="/supplier"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <FontAwesomeIcon icon={faUser} />


                                    <span>Supplier</span>
                                </Link>
                            </li>


                            {/* Logout */}
                            <li className="rounded-sm hover:text-primary ">
                                <div
                                    onClick={() => { localStorage.clear(); setSelectedStore(null); navigate("/login") }}
                                    className="flex cursor-pointer items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span>Logout</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </aside>

        </>
    )
}
