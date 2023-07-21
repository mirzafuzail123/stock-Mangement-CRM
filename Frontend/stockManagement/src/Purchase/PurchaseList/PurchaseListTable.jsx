import React from 'react'
import { useState, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import NotFound from "../../Partials/NotFound"
import GlobalStateContext from '../../Context/GlobalStateContext'
import AddSingleExpenseModal from '../Modals/AddSingleExpenseModal'
import PurchaseInvoiceModal from '../Modals/PurchaseInvoiceModal'

export default function PurchaseListTable({ data }) {

    const { formatDate } = useContext(GlobalStateContext)

    const [OpenAddExpense, setOpenAddExpense] = useState(false)
    const [OpenPurchaseInvoice, setOpenPurchaseInvoice] = useState(false)
    const [PurchaseData, setPurchaseData] = useState(false)
    const [ActionId, setActionId] = useState(null)


    return (
        <>
            {OpenAddExpense && <AddSingleExpenseModal Modal={OpenAddExpense} setModal={setOpenAddExpense} PurchaseData={PurchaseData} ActionId={ActionId} />}
            {OpenPurchaseInvoice && <PurchaseInvoiceModal Modal={OpenPurchaseInvoice} setModal={setOpenPurchaseInvoice} ActionId={ActionId} setActionId={setActionId} />}
            <table className="table-auto w-full ">
                <thead>
                    <tr className="text-left  bg-slate-700 text-xs [&>th]:text-white  [&>th]:font-semibold [&>th]:uppercase [&>th]:px-6 [&>th]:py-4 ">

                        <th>Item </th>
                        <th>Quantity</th>
                        <th>Gross Item price</th>
                        <th>Net Item price</th>
                        <th>Total Purchase Amount</th>
                        <th>Purchased At</th>
                        <th className="relative right-2">Action</th>
                    </tr>
                </thead>
                {/* Body */}
                <tbody className=''>
                    {data.length === 0 ? <tr><td colSpan={7}>  <NotFound /></td> </tr> : data.map((purchase, index) => {
                        return (
                            <tr key={index} className={`text-sm [&>td]:px-6 [&>td]:py-4 ${index % 2 == 0 && 'bg-gray-100'}  `}>
                                <td className=''>{purchase.inventoryData}</td>
                                <td>{purchase.quantity}</td>
                                <td>Rs. {purchase.grossPricePerItem}</td>
                                <td>Rs. {purchase.netPricePerItem}</td>
                                <td>Rs. {purchase.totalPurchaseAmount}</td>
                                <td>{formatDate(purchase.created)}</td>
                                <td className='flex space-x-3'>
                                    <FontAwesomeIcon onClick={() => { setOpenPurchaseInvoice(true); setActionId(purchase.id) }} icon={faEye} className="text-primary cursor-pointer" />
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        className="text-primary cursor-pointer"
                                        onClick={() => { setPurchaseData(purchase.inventoryData); setOpenAddExpense(true); setActionId(purchase.id) }} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>

    )
}
