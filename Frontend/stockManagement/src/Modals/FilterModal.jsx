import React, { useRef, useEffect, useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPaperPlane, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import GlobalStateContext from '../Context/GlobalStateContext'
import { primaryButton } from '../Partials/Styles'
import CustomAlert from '../Partials/CustomAlert'
import InputField from '../UI Elemets/InputField'
import { useLocation } from 'react-router-dom'

export default function FilterModal({
    Modal, setModal, setloading, FromFilterDate, setFromFilterDate, ToFilterDate, setToFilterDate,
    DataType, setDataType }) {

    const ModalRef = useRef()
    const location = useLocation()

    const [SubmitLoader, setSubmitLoader] = useState(false)

    const userRole = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).userType



    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        setFromFilterDate(data["fromDate"])
        setToFilterDate(data["toDate"])
        // Only for Dashboard
        if (location.pathname === '/') {
            // ADmin
            if (userRole === "Admin") {
                setDataType(data['dataType'] === "Overall" ? null : data['dataType'])
            }
        }

        setloading(true)
        setModal(false)

    }


    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className=" relative  lg:w-[35rem] h-full md:h-auto mx-auto mt-16" ref={ModalRef}>
                    <div className="relative bg-white rounded-lg shadow">
                        {/* Close */}
                        <div className='flex justify-end pr-2 pt-2'>
                            <span className='border h-6 w-6  cursor-pointer rounded-full bg-gray-100 hover:bg-primary hover:text-white flex justify-center' onClick={() => { setModal(false) }}>
                                <FontAwesomeIcon className='text-sm pt-1' icon={faClose} />
                            </span>
                        </div>
                        {/*Content  */}
                        <div className="max-h-[37rem] overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar flex flex-col px-5 pb-5">
                            <div className='border-b py-1'>
                                <h1 className='text-dark-primary text-lg font-semibold relative bottom-3'>Filters</h1>
                            </div>

                            <form onSubmit={handleSubmit} className='mt-8 flex flex-col space-y-10'>
                                <div className='flex space-x-6 w-full'>
                                    {/* From */}
                                    <div className='flex space-x-3 w-[50%] '>
                                        <h1 className=' text-xs uppercase font-semibold text-gray-500 pt-3 whitespace-nowrap' >From </h1>
                                        <InputField
                                            defaultValue={FromFilterDate}
                                            type={"date"}
                                            name="fromDate"
                                            id={"fromDate"}
                                            required={location.pathname !== '/'}
                                        />
                                    </div>
                                    {/* To */}
                                    <div className='flex space-x-3 w-[50%] '>
                                        <h1 className=' text-xs uppercase font-semibold text-gray-500 pt-3 whitespace-nowrap' >To </h1>
                                        <InputField
                                            defaultValue={ToFilterDate}
                                            type={"date"}
                                            name="toDate"
                                            id={"toDate"}
                                            required={location.pathname !== '/'}

                                        />
                                    </div>
                                </div>

                                {(location.pathname === '/' && userRole === "Admin") && <div className='flex space-x-4 w-[75%]'>
                                    <h1 className='text-xs uppercase whitespace-nowrap font-semibold text-gray-500 pt-3' >Data Type </h1>
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 "
                                        name="dataType"
                                        id={"dataType"}
                                    >
                                        <option selected={DataType === "Overall" && true} value="Overall">Overall </option>
                                        <option selected={DataType === "POS" && true} value="POS">POS </option>
                                        <option selected={DataType === "Online" && true} value="Online">Online</option>
                                    </select>

                                </div>}



                                {/* Submit Button */}
                                <div className='flex justify-end py-3'>
                                    <button type='submit' className={`${primaryButton} ${SubmitLoader && 'bg-dark-submit'}   `} >
                                        {SubmitLoader ? <FontAwesomeIcon icon={faSpinner} className='animate-spin px-2' /> : 'Add'}
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
