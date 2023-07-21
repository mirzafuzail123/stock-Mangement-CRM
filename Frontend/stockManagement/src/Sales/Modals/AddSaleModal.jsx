import React, { useRef, useEffect, useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faInfo, faInfoCircle, faPaperPlane, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import GlobalStateContext from '../../Context/GlobalStateContext'
import { primaryButton } from '../../Partials/Styles'
import { CreateSaleFunc } from '../../BackendApiCalls/SaleApi'
import CustomAlert from '../../Partials/CustomAlert'
import InputField from '../../UI Elemets/InputField'
import { AllInventoryListFunc } from '../../BackendApiCalls/InventoryApi'
import Loader from '../../Partials/Loader'
import SingleSelect from '../../UI Elemets/SingleSelect'

export default function AddSaleModal({ Modal, setModal }) {

    const ModalRef = useRef()
    const { dummyState, setdummyState, SelectedStore, SaleType, changeKeyOfObjects } = useContext(GlobalStateContext)
    const [loading, setloading] = useState(true)
    const [SubmitLoader, setSubmitLoader] = useState(false)
    const [InventoryData, setInventoryData] = useState([])

    const [Quantity, setQuantity] = useState(0)
    const [ItemPrice, setItemPrice] = useState(0.0)
    const [TotalOrder, setTotalOrder] = useState(0.0)
    const [SelectedInventory, setSelectedInventory] = useState(null)


    useEffect(() => {
        if (SelectedStore) {
            AllInventoryListFunc(SelectedStore.id).then((inventory_data) => {
                setInventoryData(inventory_data)
                setTimeout(() => {
                    setloading(false)
                }, 1000);
            })

        }
        setTimeout(() => {
            setloading(false)
        }, 1000);

    }, [])


    useEffect(() => {
        setTotalOrder((parseFloat(ItemPrice) * parseFloat(Quantity)).toFixed(2))

    }, [Quantity, ItemPrice])




    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)

        if (!SelectedInventory) {
            CustomAlert("Please select Inventory!", "error")
        }
        else {

            data["totalOrderAmount"] = TotalOrder
            data["inventory"] = SelectedInventory

            if (SelectedStore) {
                data["store"] = SelectedStore.id
                data["saleType"] = SaleType

                CreateSaleFunc(data).then(() => {
                    CustomAlert('Sale created successfully!', 'success')
                }).catch((error) => {
                    if (error.response.status === 406) {
                        CustomAlert('Insufficient Inventory!', 'error')

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


    }


    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className=" relative lg:w-[36rem] h-full md:h-auto mx-auto" ref={ModalRef}>
                    <div className="relative bg-white rounded-lg shadow">
                        {/* Close */}
                        <div className='flex justify-end pr-2 pt-2'>
                            <span className='border h-6 w-6  cursor-pointer rounded-full bg-gray-100 hover:bg-primary hover:text-white flex justify-center' onClick={() => { setModal(false) }}>
                                <FontAwesomeIcon className='text-sm pt-1' icon={faClose} />
                            </span>
                        </div>
                        {/*Content  */}
                        <div className="max-h-[39rem] overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar flex flex-col px-5 pb-5">
                            <div className='border-b py-1'>
                                <h1 className='text-dark-primary text-lg font-semibold relative bottom-3'>Add Sale</h1>
                            </div>

                            {loading ? <Loader /> : <form onSubmit={handleSubmit} className='mt-8 flex flex-col space-y-7'>

                                {/* Inventory */}
                                <div className='flex space-x-6 '>
                                    <h1 className='w-[35%] text-xs uppercase font-semibold text-gray-500 pt-4' >Inventory <span className='text-red-400'>*</span></h1>
                                    <span className='relative left-2'>
                                        <SingleSelect
                                            fieldWidth={400}
                                            options={changeKeyOfObjects(InventoryData, "itemName", "name")}
                                            returnValue={SelectedInventory}
                                            setreturnValue={setSelectedInventory}
                                        />
                                    </span>
                                </div>

                                {/* Order id */}
                                {SaleType === "Online" && <div className='flex space-x-6 '>
                                    <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' >Order id <span className='text-red-400'>*</span></h1>
                                    <InputField
                                        type={"number"}
                                        name="orderId"
                                        id={"orderId"}
                                        placeholder={"e.g  1234"}
                                        required={true}
                                    />
                                </div>
                                }

                                {/* Quantity */}
                                <div className='flex space-x-6 '>
                                    <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' >Quantity <span className='text-red-400'>*</span></h1>
                                    <InputField
                                        type={"number"}
                                        name="quantity"
                                        id={"quantity"}
                                        placeholder={"e.g  0"}
                                        required={true}
                                        handleOnChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                {/*pricePerItem */}
                                <div className='flex space-x-6 '>
                                    <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' >Item Price (PKR) <span className='text-red-400'>*</span></h1>
                                    <InputField
                                        type={"number"}
                                        step={0.01}
                                        name="pricePerItem"
                                        id={"pricePerItem"}
                                        placeholder={"e.g  0"}
                                        required={true}
                                        handleOnChange={(e) => setItemPrice(e.target.value)}

                                    />
                                </div>

                                {/*Note */}
                                <div className='flex space-x-6 '>
                                    <h1 className=' text-xs w-[30%] uppercase font-semibold text-gray-500 pt-3' >Note ( <span className='lowercase'>optional</span> )</h1>
                                    <textarea
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 "
                                        name="notes"
                                        id={"notes"}
                                        placeholder={"IMEI or any unique numebr for Item."}

                                    />
                                </div>


                                <div className='border-t border-b py-4 relative top-3 '>
                                    <div className='flex flex-col space-y-5'>
                                        {/* Net Price Per Item */}
                                        <div className='flex justify-between'>
                                            <h1 className='font-semibold text-sm'>Total Order Amount :</h1>
                                            <h1 className='text-center'><span className='font-bold'>Rs.</span> {isNaN(TotalOrder) ? 0.0 : TotalOrder}</h1>
                                        </div>

                                    </div>
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
