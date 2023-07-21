import React, { useRef, useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons'
import InputField from '../UI Elemets/InputField'
import { primaryButton } from '../Partials/Styles'
import { CreateStoreFunc } from '../BackendApiCalls/StoreApi'
import CustomAlert from '../Partials/CustomAlert'
import GlobalStateContext from '../Context/GlobalStateContext'


export default function AddStoreModal({ Modal, setModal }) {

    const { dummyState, setdummyState, SelectedStore } = useContext(GlobalStateContext)

    const [SubmitLoader, setSubmitLoader] = useState(false)






    const handleOnSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        CreateStoreFunc(data)
            .then(() => {
                CustomAlert("Store added successfully!", "success")
            }).catch(() => {
                CustomAlert("Something went wrong! Please try again.", "error")
            }).finally(() => {
                setdummyState(!dummyState)
                setSubmitLoader(false)
                setModal(false)
            })

    }

    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-[30rem] h-full  md:h-auto mx-auto mt-14" >
                    <div className="relative bg-white rounded-lg shadow">
                        {/* Close */}
                        <div className='flex justify-end pr-2 pt-2'>
                            <span className='border h-6 w-6  cursor-pointer rounded-full bg-gray-100 hover:bg-primary hover:text-white flex justify-center' onClick={() => { setModal(false) }}>
                                <FontAwesomeIcon className='text-sm pt-1' icon={faClose} />
                            </span>
                        </div>
                        {/*Content  */}
                        <div className=" flex flex-col px-5 pb-5 ">
                            <div className=''>
                                <h1 className='text-dark-primary text-xl font-semibold relative bottom-3'>Add Store</h1>
                            </div>
                            <form onSubmit={handleOnSubmit} className='mt-6 flex flex-col space-y-7'>
                                {/* Store Name */}
                                <div className='flex space-x-6 '>
                                    <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' > Store Name <span className='text-red-400'>*</span></h1>
                                    <InputField
                                        type={"text"}
                                        name="storeName"
                                        id={"storeName"}
                                        placeholder={"e.g  Inbound"}
                                        required={true}
                                    />
                                </div>

                                {/* Submit */}
                                <div className='flex justify-end py-3'>
                                    <button type='submit' className={`${primaryButton} ${SubmitLoader && 'bg-red-300'} `} >
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
