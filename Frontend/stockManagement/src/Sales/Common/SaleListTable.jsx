import React from 'react'
import { useState, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard, faCopy, faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import NotFound from "../../Partials/NotFound"
import GlobalStateContext from '../../Context/GlobalStateContext'
import AddSingleSaleExpenseModal from '../Modals/AddSingleSaleExpenseModal'
import SaleInvoiceModal from '../Modals/SaleInvoiceModal'

export default function SaleListTable({ data }) {

    const { formatDate, copyToClipboard } = useContext(GlobalStateContext)

    const [OpenAddExpense, setOpenAddExpense] = useState(false)
    const [OpenSaleInvoice, setOpenSaleInvoice] = useState(false)
    const [SaleData, setSaleData] = useState(false)
    const [ActionId, setActionId] = useState(null)

    return (
        <>
            {OpenAddExpense && <AddSingleSaleExpenseModal Modal={OpenAddExpense} setModal={setOpenAddExpense} SaleData={SaleData} ActionId={ActionId} />}
            {OpenSaleInvoice && <SaleInvoiceModal Modal={OpenSaleInvoice} setModal={setOpenSaleInvoice} ActionId={ActionId} setActionId={setActionId} />}
            <table className="table-auto w-full ">
                <thead>
                    <tr className="text-left  bg-slate-700 text-xs [&>th]:text-white  [&>th]:font-semibold [&>th]:uppercase [&>th]:px-6 [&>th]:py-4 ">

                        <th>Item</th>
                        <th>Sale Type </th>
                        <th>Quantity</th>
                        <th>Item price</th>
                        <th>Total Order Amount</th>
                        <th>Sold At</th>
                        <th className="relative right-2">Action</th>
                    </tr>
                </thead>
                {/* Body */}
                <tbody className=''>
                    {data.length === 0 ? <tr><td colSpan={7}>  <NotFound /></td> </tr> : data.map((sale, index) => {
                        return (
                            <tr key={index} className={`text-sm [&>td]:px-6 [&>td]:py-4 ${index % 2 == 0 && 'bg-gray-100'}  `}>
                                <td className="space-y-1">
                                    <p className=""> {sale.inventoryData} </p>
                                    <p className="text-gray-500 italic text-xs font-semibold tracking-wide"> {sale.orderId}
                                        <span><FontAwesomeIcon icon={faClipboard} className="pl-2 cursor-pointer text-slate-700" onClick={() => copyToClipboard(sale.orderId)} /></span>
                                    </p>
                                </td>
                                <td className=''>{sale.saleType}</td>
                                <td>{sale.quantity}</td>
                                <td>Rs. {sale.pricePerItem}</td>
                                <td>Rs. {sale.totalOrderAmount}</td>
                                <td>{formatDate(sale.created)}</td>
                                <td className='flex space-x-3 relative top-3'>
                                    <FontAwesomeIcon onClick={() => { setOpenSaleInvoice(true); setActionId(sale.orderId) }} icon={faEye} className="text-primary cursor-pointer" />
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        className="text-primary cursor-pointer"
                                        onClick={() => { setSaleData(sale.inventoryData); setOpenAddExpense(true); setActionId(sale.orderId) }} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>

    )
}
