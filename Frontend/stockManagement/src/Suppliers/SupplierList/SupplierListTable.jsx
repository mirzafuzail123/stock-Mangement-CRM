import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import EditSupplierModal from '../Modals/EditSupplierModal'
import NotFound from "../../Partials/NotFound"

export default function SupplierListTable({ data }) {

    const [OpenEditSupplier, setOpenEditSupplier] = useState(false)
    const [ActionId, setActionId] = useState(false)

    return (
        <>
            {OpenEditSupplier && <EditSupplierModal Modal={OpenEditSupplier} setModal={setOpenEditSupplier} ActionId={ActionId} setActionId={setActionId} />}
            <table className="table-auto w-full  ">
                <thead>
                    <tr className="text-left bg-slate-700 text-xs [&>th]:text-white [&>th]:w-[50%] [&>th]:font-semibold [&>th]:uppercase [&>th]:px-6 [&>th]:py-4 ">

                        <th>Name</th>
                        <th>Phone</th>
                        <th className="relative right-2">Action</th>
                    </tr>
                </thead>
                {/* Body */}
                <tbody className=''>
                    {data.length === 0 ? <tr><td colSpan={7}>  <NotFound /></td> </tr> : data.map((supplier, index) => {
                        return (
                            <tr key={index} className={`text-sm [&>td]:px-6 [&>td]:py-4 [&>td]:w-[50%] ${index % 2 == 0 && 'bg-gray-100'} `}>
                                <td>{supplier.name}</td>
                                <td>{supplier.phone}</td>
                                <td><FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="text-primary cursor-pointer"
                                    onClick={() => { setActionId(supplier.id); setOpenEditSupplier(true) }} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>

    )
}
