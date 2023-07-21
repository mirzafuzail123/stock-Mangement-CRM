import React, { useRef, useEffect, useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPaperPlane, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import GlobalStateContext from '../../Context/GlobalStateContext'
import { primaryButton } from '../../Partials/Styles'
import { CreatePurchaseFunc } from '../../BackendApiCalls/PurchaseApi'
import CustomAlert from '../../Partials/CustomAlert'
import InputField from '../../UI Elemets/InputField'
import { AllInventoryListFunc } from '../../BackendApiCalls/InventoryApi'
import { SupplierListFunc } from '../../BackendApiCalls/SupplierApi'
import Loader from '../../Partials/Loader'
import SingleSelect from '../../UI Elemets/SingleSelect'

export default function AddPurchaseModal({ Modal, setModal }) {

    const ModalRef = useRef()
    const { dummyState, setdummyState, SelectedStore, changeKeyOfObjects } = useContext(GlobalStateContext)
    const [loading, setloading] = useState(true)
    const [SubmitLoader, setSubmitLoader] = useState(false)
    const [InventoryData, setInventoryData] = useState([])
    const [SupplierData, setSupplierData] = useState([])

    const [Quantity, setQuantity] = useState(0)
    const [GrossItemPrice, setGrossItemPrice] = useState(0.0)
    const [ExtraExpense, setExtraExpense] = useState(0.0)
    const [NetItemPrice, setNetItemPrice] = useState(0.0)
    const [TotalPurchase, setTotalPurchase] = useState(0.0)

    const [SelectedSupplier, setSelectedSupplier] = useState(null)
    const [SelectedInventory, setSelectedInventory] = useState(null)


    useEffect(() => {
        if (SelectedStore) {
            AllInventoryListFunc(SelectedStore.id).then((inventory_data) => {
                setInventoryData(inventory_data)
                SupplierListFunc(SelectedStore.id).then((supplier_data) => {
                    setSupplierData(supplier_data)
                    setTimeout(() => {
                        setloading(false)
                    }, 1000);
                })
            })

        }
        else {
            setTimeout(() => {
                setloading(false)
            }, 1000);
        }

    }, [])

    useEffect(() => {

        let expansePerItem = parseFloat(ExtraExpense ? ExtraExpense : 0) / parseFloat(Quantity)
        let netItemPrice = parseFloat(GrossItemPrice) + parseFloat(expansePerItem ? expansePerItem : 0)
        let totalPurchase = (parseFloat(GrossItemPrice) * parseFloat(Quantity)) + parseFloat(ExtraExpense ? ExtraExpense : 0)

        setNetItemPrice(netItemPrice.toFixed(2))
        setTotalPurchase(totalPurchase.toFixed(2))


    }, [Quantity, GrossItemPrice, ExtraExpense])


    // Submit Form
    const handleSubmit = (e) => {
        e.preventDefault()
        // setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)

        if (!SelectedInventory) {
            CustomAlert("Please select inventory!", "error")
            setSubmitLoader(false)
        }
        else if (!SelectedSupplier) {
            CustomAlert("Please select supplier!", "error")
            setSubmitLoader(false)
        }
        else {
            data["netPricePerItem"] = NetItemPrice
            data["totalPurchaseAmount"] = TotalPurchase
            data["supplier"] = SelectedSupplier
            data["inventory"] = SelectedInventory

            if (SelectedStore) {
                data["store"] = SelectedStore.id
                !data['totalExpenseAmount'] && (data['totalExpenseAmount'] = 0)


                CreatePurchaseFunc(data).then(() => {
                    CustomAlert('Purchase created successfully!', 'success')
                }).catch(() => {
                    CustomAlert('Something went wrong! Please try again.', 'error')
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
                <div className=" relative lg:w-[55rem] h-full md:h-auto mx-auto " ref={ModalRef}>
                    <div className="relative bg-white rounded-lg shadow">
                        {/* Close */}
                        <div className='flex justify-end pr-2 pt-2'>
                            <span className='border h-6 w-6  cursor-pointer rounded-full bg-gray-100 hover:bg-primary hover:text-white flex justify-center' onClick={() => { setModal(false) }}>
                                <FontAwesomeIcon className='text-sm pt-1' icon={faClose} />
                            </span>
                        </div>
                        {/*Content  */}
                        <div className="max-h-[40rem] overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar flex flex-col px-5 pb-5">
                            <div className='border-b py-1'>
                                <h1 className='text-dark-primary text-lg font-semibold relative bottom-3'>Add Purchase</h1>
                            </div>

                            {loading ? <Loader /> : <form onSubmit={handleSubmit} className='mt-8 flex flex-col space-y-9'>
                                {/* Row 1  */}
                                <div className='flex space-x-6'>
                                    {/* Supplier */}
                                    <div className='flex w-[50%] space-x-8 whitespace-nowrap'>
                                        <h1 className='w-[30%] text-xs  uppercase font-semibold text-gray-500 pt-4' >Supplier <span className='text-red-400'>*</span></h1>
                                        <SingleSelect
                                            fieldWidth={310}
                                            options={SupplierData}
                                            returnValue={SelectedSupplier}
                                            setreturnValue={setSelectedSupplier}
                                        />
                                    </div>
                                    {/* Inventory */}
                                    <div className='flex w-[50%] s whitespace-nowrap '>

                                        <h1 className='w-[30%] text-xs  uppercase font-semibold text-gray-500 pt-4 pr-2' >Inventory <span className='text-red-400'>*</span></h1>
                                        <SingleSelect
                                            fieldWidth={310}
                                            options={changeKeyOfObjects(InventoryData, "itemName", "name")}
                                            returnValue={SelectedInventory}
                                            setreturnValue={setSelectedInventory}
                                        />
                                    </div>
                                </div>
                                {/* Row 1  */}
                                <div className='flex space-x-6'>
                                    {/* Quantity */}
                                    <div className='flex w-[50%] space-x-4 whitespace-nowrap'>
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
                                    {/* grossPricePerItem */}
                                    <div className='flex space-x-2 w-[50%] '>
                                        <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' >gross Item Price (PKR) <span className='text-red-400'>*</span></h1>
                                        <InputField
                                            type={"number"}
                                            step={0.01}
                                            name="grossPricePerItem"
                                            id={"grossPricePerItem"}
                                            placeholder={"e.g  0"}
                                            required={true}
                                            handleOnChange={(e) => setGrossItemPrice(e.target.value)}

                                        />
                                    </div>
                                </div>

                                {/* Row 3  */}
                                <div className='flex space-x-6'>
                                    {/* extraExpense    */}
                                    <div className='flex space-x-4 w-[50%]'>
                                        <h1 className='w-[30%] text-xs uppercase font-semibold text-gray-500 pt-3' >Extra Expense (PKR) </h1>
                                        <InputField
                                            type={"number"}
                                            step={0.01}
                                            name="totalExpenseAmount"
                                            id={"totalExpenseAmount"}
                                            placeholder={"e.g  0"}
                                            handleOnChange={(e) => setExtraExpense(e.target.value)}

                                        />
                                    </div>
                                </div>


                                <div className='border-t border-b py-4 relative top-3 '>
                                    <div className='flex flex-col space-y-5'>
                                        {/* Net Price Per Item */}
                                        <div className='flex justify-between'>
                                            <h1 className='font-semibold text-sm'>Net Item Price :</h1>
                                            <h1 className='text-center'><span className='font-bold'>Rs.</span> {isNaN(NetItemPrice) ? 0.0 : NetItemPrice}</h1>
                                        </div>

                                        {/* Net Price Per Item */}
                                        <div className='flex justify-between'>
                                            <h1 className='font-semibold text-sm'>Total Purchase Amount :</h1>
                                            <h1 className='text-center'><span className='font-bold'>Rs.</span> {isNaN(TotalPurchase) ? 0.0 : TotalPurchase}</h1>
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
