import React from 'react'
import { useState, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import NotFound from "../../Partials/NotFound"
import GlobalStateContext from '../../Context/GlobalStateContext'

export default function ReturnListTable({ data }) {

    const { copyToClipboard, formatDate } = useContext(GlobalStateContext)
    const [ActionId, setActionId] = useState(false)
    return (
        <>
            <table className="table-auto w-full  ">
                <thead>
                    <tr className="text-left bg-slate-700 text-xs [&>th]:text-white [&>th]:font-semibold [&>th]:uppercase [&>th]:px-6 [&>th]:py-4 ">

                        <th>Item</th>
                        <th>Return Type</th>
                        <th>Return Quantity</th>
                        <th className="relative right-2">Returned At</th>
                    </tr>
                </thead>
                {/* Body */}
                <tbody className=''>
                    {data.length === 0 ? <tr><td colSpan={7}>  <NotFound /></td> </tr> : data.map((returnOrder, index) => {
                        return (
                            <tr key={index} className={`text-sm [&>td]:px-6 [&>td]:py-4  ${index % 2 == 0 && 'bg-gray-100'} `}>
                                <td className="space-y-1">
                                    <p className=""> {returnOrder.orderData.inventory} </p>
                                    <p className="text-gray-500 italic text-xs font-semibold tracking-wide"> {returnOrder.orderData.orderId}
                                        <span><FontAwesomeIcon icon={faClipboard} className="pl-2 cursor-pointer text-slate-700" onClick={() => copyToClipboard(returnOrder.orderData.orderId)} /></span>
                                    </p>
                                </td>
                                <td>{returnOrder.returnType}</td>
                                <td>{returnOrder.quantity}</td>
                                <td>{formatDate(returnOrder.created)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>

    )
}
