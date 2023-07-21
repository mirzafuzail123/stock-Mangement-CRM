import React, { useRef, useEffect, useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faDownload, faPaperPlane, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import Invoice from '../../Partials/Invoice'
import { primaryButton } from '../../Partials/Styles'
import { SinglePurchaseFunc } from '../../BackendApiCalls/PurchaseApi'
import GlobalStateContext from '../../Context/GlobalStateContext'
import Loader from "../../Partials/Loader"
import html2pdf from 'html2pdf.js';

export default function PurchaseInvoiceModal({ Modal, setModal, ActionId, setActionId }) {

    const { formatDate } = useContext(GlobalStateContext)

    const [loading, setloading] = useState(true)
    const [InvoiceLabelData, setInvoiceLabelData] = useState([])
    const [InvoiceData, setInvoiceData] = useState(null)

    const InvoiceLabels = ["Purchase Id", "Supplier", "Purchased at"]

    useEffect(() => {
        SinglePurchaseFunc(ActionId).then((data) => {
            setInvoiceLabelData([data.id, data.supplierData, formatDate(data.created)])
            setInvoiceData(data)
            setTimeout(() => {
                setloading(false)
            }, 1000);
        })
    }, [])

    const handleExportPDF = () => {
        const receipt = document.getElementById('invoice');
        // create a new HTML element with the same content as the receipt element
        const content = document.createElement('div');
        content.innerHTML = receipt.innerHTML;
        // set the width of the new element to match the width of the receipt element
        content.style.width = 780 + 'px';
        content.style.padding = 50 + 'px';
        // use html2pdf.js to convert the new element to PDF
        const options = {
            image: { type: 'jpeg', quality: 0.9 },
            html2canvas: { scale: 5 },
        };
        // use html2pdf.js to convert the new element to PDF
        html2pdf().set(options).from(content).save('invoice.pdf');
    };
    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className=" relative  lg:w-[33rem] h-full md:h-auto mx-auto mt-4 " >
                    <div className="relative bg-white rounded-lg shadow">
                        {/* Close */}
                        <div className='flex justify-end pr-2 pt-2'>
                            <span className='border h-6 w-6  cursor-pointer rounded-full bg-gray-100 hover:bg-primary hover:text-white flex justify-center' onClick={() => { setModal(false); setActionId(null) }}>
                                <FontAwesomeIcon className='text-sm pt-1' icon={faClose} />
                            </span>
                        </div>
                        {/*Content  */}
                        {loading ? <Loader /> : <div className=" flex flex-col px-5  ">

                            <div className='max-h-[33rem]  overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar ' id="invoice">
                                <Invoice
                                    InvoiceLabels={InvoiceLabels}
                                    InvoiceLabelData={InvoiceLabelData}
                                    InvoiceData={InvoiceData}
                                    InvoiceItemLabels={["Item", "Quantity", "Gross Item Price"]}
                                    InvoiceItemData={[InvoiceData.inventoryData, InvoiceData.quantity, InvoiceData.grossPricePerItem]}
                                    InvoiceTotalAmountLabels={[InvoiceData.extraExpenseData, "Total Expense", "Net Item Price", "Total  Amount"]}
                                    InvoiceTotalAmountData={[InvoiceData.extraExpenseData, InvoiceData.totalExpenseAmount, InvoiceData.netPricePerItem, InvoiceData.totalPurchaseAmount]}
                                />
                            </div>

                            <div className=' border-t  flex justify-end py-5 mt-5'>
                                <button type='submit' className={`${primaryButton} `} onClick={handleExportPDF}><FontAwesomeIcon icon={faDownload} className='pr-1' />
                                    Export as PDF
                                </button>
                            </div>


                        </div>}



                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
