import React, { useRef, useEffect, useContext, useState } from 'react'
import Loader from '../../Partials/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPaperPlane, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import GlobalStateContext from '../../Context/GlobalStateContext'
import { primaryButton } from '../../Partials/Styles'
import { AllUsersFunc, CreateUserFunc, UpdateUserPermissionFunc } from '../../BackendApiCalls/AuthApi'
import CustomAlert from '../../Partials/CustomAlert'
import InputField from '../../UI Elemets/InputField'
import SingleSelect from '../../UI Elemets/SingleSelect'

export default function AddExistingUserModal({ Modal, setModal }) {

    const ModalRef = useRef()
    const { dummyState, setdummyState, SelectedStore, changeKeyOfObjects } = useContext(GlobalStateContext)

    const [SubmitLoader, setSubmitLoader] = useState(false)
    const [loading, setloading] = useState(true)
    const [UserList, setUserList] = useState([])
    const [SelectedUser, setSelectedUser] = useState(null)
    const [UserRole, setUserRole] = useState(null)

    useEffect(() => {
        if (SelectedStore) {
            AllUsersFunc(SelectedStore.id).then((data) => {
                setUserList(data)
                setTimeout(() => {
                    setloading(false)
                }, 500);
            })
        }
        else {
            setTimeout(() => {
                setloading(false)
            }, 500)
        }


    }, [])

    useEffect(() => {
        UserList.length !== 0 && setUserRole(UserList.filter((user) => user.id === SelectedUser)[0].userRole)
    }, [SelectedUser])



    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)

        if (SelectedStore) {
            data["store"] = SelectedStore.id

            if (!SelectedUser) {
                CustomAlert("Please select user!", "error")
                setSubmitLoader(false)
            }
            else {
                UpdateUserPermissionFunc(SelectedUser, data).then(() => {
                    CustomAlert('User created successfully!', 'success')
                }).catch(() => {
                    CustomAlert('Something went wrong! Please try again.', 'error')
                }).finally(() => {
                    setdummyState(!dummyState)
                    setSubmitLoader(false)
                    setModal(false)
                })
            }

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
                                <h1 className='text-dark-primary text-lg font-semibold relative bottom-3'>Add Existing User</h1>
                            </div>

                            {loading ? <Loader /> : <form onSubmit={handleSubmit} className='mt-8 flex flex-col space-y-7'>
                                {/* User */}
                                <div className='flex space-x-6 '>
                                    <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' >User <span className='text-red-400'>*</span></h1>
                                    <SingleSelect
                                        fieldWidth={340}
                                        options={changeKeyOfObjects(UserList, "user", "name")}
                                        returnValue={SelectedUser}
                                        setreturnValue={setSelectedUser}
                                    />
                                </div>

                                {/* User Role */}
                                <div className='flex space-x-6 '>
                                    <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' >Assign Role <span className='text-red-400'>*</span></h1>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 "
                                        readOnly
                                        name='userRole'
                                        value={UserRole} />

                                </div>


                                {/* Submit Button */}
                                <div className='flex justify-end py-3'>
                                    <button type='submit' disabled={SubmitLoader} className={`${primaryButton} ${SubmitLoader && 'bg-dark-submit'}   `} >
                                        {SubmitLoader ? <FontAwesomeIcon icon={faSpinner} className='animate-spin px-2' /> : 'Add'}
                                    </button>
                                </div>

                            </form>
                            }
                        </div>

                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
