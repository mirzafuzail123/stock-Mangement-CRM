import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { primaryButton } from '../../Partials/Styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import SearchField from '../../UI Elemets/SearchField'
import AddNewUserModal from '../Modals/AddNewUserModal'
import AddExistingUserModal from '../Modals/AddExistingUserModal'

export default function UserHeader() {

    const [OpenAddUserDropDown, setOpenAddUserDropDown] = useState(false)
    const [OpenAddNewUser, setOpenAddNewUser] = useState(false)
    const [OpenExistingUser, setOpenExistingUser] = useState(false)

    const AddUserRef = useRef()

    useEffect(() => {
        const handler = (e) => {
            if (AddUserRef.current && !AddUserRef.current.contains(e.target)) {
                setOpenAddUserDropDown(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])

    return (
        <>
            <AddNewUserModal Modal={OpenAddNewUser} setModal={setOpenAddNewUser} />
            {OpenExistingUser && <AddExistingUserModal Modal={OpenExistingUser} setModal={setOpenExistingUser} />}
            <div className='lg:flex  xs:space-y-5 lg:space-y-0 justify-between mt-6 w-full'>
                {/* Search FIeld */}

                <div>
                    <SearchField />
                </div>
                <div className='relative'>
                    <button onClick={() => setOpenAddUserDropDown(!OpenAddUserDropDown)} type={'button'} className={`${primaryButton} `} > <FontAwesomeIcon icon={faAdd} className='pr-1' /> Add User</button>
                    {OpenAddUserDropDown && <>
                        <div ref={AddUserRef} className=' absolute w-[7.5rem] bg-white border-2 shadow-lg z-50 px-4 py-3 mt-2 dropdown_animation '>
                            <div className='flex flex-col space-y-3 whitespace-nowrap text-sm cursor-pointer '>
                                <h1 onClick={() => { setOpenExistingUser(true); setOpenAddUserDropDown(false) }} className='hover:text-primary '>Add Existing </h1>
                                <h1 onClick={() => { setOpenAddNewUser(true); setOpenAddUserDropDown(false) }} className='hover:text-primary '>Add New </h1>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </>
    )
}
