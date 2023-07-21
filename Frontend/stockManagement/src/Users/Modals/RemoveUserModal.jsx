import React, { useRef, useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faSpinner, faWarning } from '@fortawesome/free-solid-svg-icons'
import Lottie from 'lottie-react'
import ActionConfirmLogo from '../../assets/ActionConfirmLogo.json'
import GlobalStateContext from '../../Context/GlobalStateContext'
import { primaryButton } from '../../Partials/Styles'
import CustomAlert from '../../Partials/CustomAlert'
import { RemoveFromStoreFunc } from '../../BackendApiCalls/AuthApi'

export default function RemoveUserModal({ Modal, setModal, userId, setuserId, UserName }) {

    const ModalRef = useRef()
    const { SelectedStore, dummyState, setdummyState } = useContext(GlobalStateContext)
    const [SubmitLoader, setSubmitLoader] = useState(false)
    useEffect(() => {
        const handler = (e) => {
            if (ModalRef.current && !ModalRef.current.contains(e.target)) {
                setModal(false)
                setuserId(null)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])
    const hanldeConfirm = () => {
        setSubmitLoader(true)
        RemoveFromStoreFunc(userId, SelectedStore.id)
            .then(() => {
                CustomAlert("User removed successfully!", "success")
            })
            .catch(() => {
                CustomAlert("Something went wrong! Please try again.", "error")
            })
            .finally(() => {
                setSubmitLoader(false)
                setModal(false)
                setdummyState(!dummyState)
            })
    }

    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-[26rem] h-full  md:h-auto mx-auto mt-16" ref={ModalRef}>
                    <div className="relative bg-white rounded-lg shadow">
                        {/* Close */}
                        <div className='flex justify-end pr-2 pt-2'>
                            <span className='border h-6 w-6  cursor-pointer rounded-full bg-gray-100 hover:bg-primary hover:text-white flex justify-center' onClick={() => { setModal(false); setuserId(null) }}>
                                <FontAwesomeIcon className='text-sm pt-1' icon={faClose} />
                            </span>
                        </div>
                        {/*Content  */}
                        <div className=" flex flex-col pb-5">
                            <div className='w-32 mx-auto relative bottom-3'>
                                <Lottie animationData={ActionConfirmLogo}></Lottie>
                            </div>

                            <div className='flex  space-x-4 bg-red-200 border-l-4 border-red-400 w-[90%] mx-auto px-3 py-5 rounded-md'>
                                <FontAwesomeIcon icon={faWarning} className='text-red-600 pt-2' />
                                <h1 className='text-xs'>Are you sure you want to remove <span className='font-semibold'>{UserName} </span> from <br /><span className='font-semibold'>{SelectedStore.storeName} </span>  ? </h1>
                            </div>

                            <div className='flex justify-end space-x-5 px-5 mt-8 mb-3'>
                                <button className={`${primaryButton}  ${SubmitLoader ? 'bg-red-300 hover:bg-red-300' : 'bg-red-500 hover:bg-red-600'} `} onClick={hanldeConfirm}>{SubmitLoader ? <FontAwesomeIcon icon={faSpinner} className='animate-spin px-2' /> : 'Remove'}</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
