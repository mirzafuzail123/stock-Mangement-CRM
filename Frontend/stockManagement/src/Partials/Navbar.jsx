import { faAngleDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import HeadingIcon from '../assets/HeadingIcon.png'
import StoreIcon from '../assets/StoreIcon.png'
import AddStoreLogo from '../assets/AddStoreLogo.png'
import UserLogo from '../assets/UserLogo.png'
import UserListLogo from '../assets/UserListLogo.png'
import { StoreListFunc } from '../BackendApiCalls/StoreApi'
import GlobalStateContext from '../Context/GlobalStateContext'
import AddStoreModal from '../Modals/AddStoreModal'
import ChangePasswordModal from '../Modals/ChangePasswordModal'

export default function Navbar() {

    const StoreRef = useRef()
    const UserRef = useRef()
    const navigate = useNavigate()

    const { dummyState, setdummyState, SelectedStore, setSelectedStore, setParentLoading } = useContext(GlobalStateContext)

    const [StoreData, setStoreData] = useState([])
    const [StoreDropdown, setStoreDropdown] = useState(false)
    const [OpenAddStore, setOpenAddStore] = useState(false)
    const [OpenChangePassword, setOpenChangePassword] = useState(false)

    const [UserDropDown, setUserDropDown] = useState(false)

    const userDate = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData"))
    const userRole = userDate && userDate.userType

    useEffect(() => {
        const handler = (e) => {
            if (StoreRef.current && !StoreRef.current.contains(e.target)) {
                setStoreDropdown(false)
            }
            if (UserRef.current && !UserRef.current.contains(e.target)) {
                setUserDropDown(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])


    useEffect(() => {
        StoreListFunc().then((data) => {
            setStoreData(data)
            !SelectedStore && setSelectedStore(data[0])
        })
    }, [dummyState])


    const handleStoreSelect = (store) => {
        setSelectedStore(store)
        setdummyState(!dummyState)
        setParentLoading(true)
    }

    return (
        <>
            <AddStoreModal Modal={OpenAddStore} setModal={setOpenAddStore} />
            <ChangePasswordModal Modal={OpenChangePassword} setModal={setOpenChangePassword} />
            <nav className='flex justify-between bg-white  shadow-md h-16  py-3 px-6'>
                {/* Heading */}
                <div className='flex space-x-3 '>
                    <img src={HeadingIcon} className='w-8 h-8 relative top-1' />
                    <h1 className='text-3xl font-bold heading text-primary'>{SelectedStore && SelectedStore.storeName}</h1>
                </div>


                {/* Store */}
                <div className='flex space-x-4 cursor-pointer relative right-1 top-1'>
                    <div className='flex space-x-2'>
                        <img onClick={() => setStoreDropdown(!StoreDropdown)} src={StoreIcon} className='h-7 w-7' />
                        <FontAwesomeIcon onClick={() => setStoreDropdown(!StoreDropdown)} icon={faAngleDown} className='relative top-2 text-gray-500' />
                    </div>
                    {userRole === "Admin" && <img src={AddStoreLogo} onClick={() => setOpenAddStore(true)} className="text-primary hover:text-secondary h-7 w-7" />}
                    {userRole === "Admin" && <img src={UserListLogo} onClick={() => navigate("/users")} className="text-primary hover:text-secondary h-7 w-7 " />}
                    {/* User Profile */}
                    <div className='relative'>
                        <img src={UserLogo} onClick={() => setUserDropDown(true)} className="text-primary hover:text-secondary h-8 w-8 " />
                        {UserDropDown && <>
                            <div ref={UserRef} className='-right-4 absolute w-[10rem] bg-white border-2 shadow-lg z-50 px-4 py-3 mt-6 dropdown_animation '>
                                <div className='flex flex-col space-y-3 whitespace-nowrap text-sm cursor-pointer '>
                                    {/* Heading */}
                                    <div className="pt-0.5 pb-2  border-b border-slate-200">
                                        <div className="font-semibold text-sm text-slate-800 whitespace-nowrap">{userDate.username}</div>
                                        <div className="text-xs text-slate-500 italic">{userDate.userType}</div>
                                    </div>
                                    {/* Options */}
                                    <h1 onClick={() => { setOpenChangePassword(true); setUserDropDown(false) }} className='hover:text-primary '>Change Password </h1>
                                </div>
                            </div>
                        </>}
                    </div>

                    {/* Dropdown */}
                    {StoreDropdown && <div ref={StoreRef} className='dropdown_animation z-50 shadow-sm absolute bg-white w-40 px-4 py-2 space-y-3 top-14 right-10  border'>
                        {StoreData.length !== 0 && StoreData.map((store, index) => {
                            return (
                                <h1
                                    onClick={() => handleStoreSelect(store)}
                                    className={`${(SelectedStore) && (SelectedStore.id === store.id && "text-primary")} hover:text-primary`}
                                    key={index}>
                                    {store.storeName}
                                </h1>
                            )
                        })}
                    </div>}

                </div>
            </nav>
        </>
    )
}
