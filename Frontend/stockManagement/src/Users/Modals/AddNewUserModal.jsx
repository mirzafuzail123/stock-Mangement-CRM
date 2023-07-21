import React, { useRef, useEffect, useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPaperPlane, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import GlobalStateContext from '../../Context/GlobalStateContext'
import { primaryButton } from '../../Partials/Styles'
import { CreateUserFunc } from '../../BackendApiCalls/AuthApi'
import CustomAlert from '../../Partials/CustomAlert'
import InputField from '../../UI Elemets/InputField'

export default function AddNewUserModal({ Modal, setModal }) {

    const ModalRef = useRef()
    const { dummyState, setdummyState, SelectedStore } = useContext(GlobalStateContext)

    const [SubmitLoader, setSubmitLoader] = useState(false)


    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)

        if (SelectedStore) {
            data["store"] = SelectedStore.id

            CreateUserFunc(data).then(() => {
                CustomAlert('User created successfully!', 'success')
            }).catch((error) => {
                if (error.response.status === 406) {
                    CustomAlert('User already exists!', 'error')

                }
                else {
                    CustomAlert('Something went wrong! Please try again.', 'error')

                }
            }).finally(() => {
                setdummyState(!dummyState)
                setSubmitLoader(false)
                setModal(false)
            })
        }

        else {
            CustomAlert("Please add store first!", "error")
            setSubmitLoader(false)
            setModal(false)
        }

    }


    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className=" relative  lg:w-[32rem] h-full md:h-auto mx-auto mt-10" ref={ModalRef}>
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
                                <h1 className='text-dark-primary text-lg font-semibold relative bottom-3'>Add User</h1>
                            </div>

                            <form onSubmit={handleSubmit} className='mt-8 flex flex-col space-y-7'>
                                {/* Name */}
                                <div className='flex space-x-6 '>
                                    <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' >USername <span className='text-red-400'>*</span></h1>
                                    <InputField
                                        type={"text"}
                                        name="username"
                                        id={"username"}
                                        placeholder={"e.g  John"}
                                        required={true}
                                    />
                                </div>

                                {/*Email */}
                                <div className='flex space-x-6 '>
                                    <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' >Email <span className='text-red-400'>*</span></h1>
                                    <InputField
                                        type={"email"}
                                        name="email"
                                        id={"email"}
                                        placeholder="e.g  name@gmail.com"
                                        required={true}
                                    />
                                </div>

                                {/* User Role */}
                                <div className='flex space-x-6 '>
                                    <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' >Assign Role <span className='text-red-400'>*</span></h1>
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 "
                                        name="userRole"
                                        id={"userRole"}
                                        required={true}
                                    >
                                        <option value="POS seller">POS seller</option>
                                        <option value="Online seller">Online seller</option>
                                    </select>

                                </div>


                                {/* Submit Button */}
                                <div className='flex justify-end py-3'>
                                    <button type='submit' disabled={SubmitLoader} className={`${primaryButton} ${SubmitLoader && 'bg-dark-submit'}   `} >
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
