import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import EditInventoryModal from '../Modals/EditInventoryModal'
import NotFound from "../../Partials/NotFound"

export default function InventoryListTable({ data }) {

    const [OpenEditInventory, setOpenEditInventory] = useState(false)
    const [ActionId, setActionId] = useState(false)

    return (
        <>
            {OpenEditInventory && <EditInventoryModal Modal={OpenEditInventory} setModal={setOpenEditInventory} ActionId={ActionId} setActionId={setActionId} />}
            <table className="table-auto w-full  ">
                <thead>
                    <tr className="text-left bg-slate-700 text-xs [&>th]:text-white [&>th]:w-[50%] [&>th]:font-semibold [&>th]:uppercase [&>th]:px-6 [&>th]:py-4 ">

                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th className="relative right-2">Action</th>
                    </tr>
                </thead>
                {/* Body */}
                <tbody className=''>
                    {data.length === 0 ? <tr><td colSpan={7}>  <NotFound /></td> </tr> : data.map((inventory, index) => {
                        return (
                            <tr key={index} className={`text-sm [&>td]:px-6 [&>td]:py-4 [&>td]:w-[50%] ${index % 2 == 0 && 'bg-gray-100'} `}>
                                <td>{inventory.itemName}</td>
                                <td>{inventory.quantity}</td>
                                <td><FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="text-primary cursor-pointer"
                                    onClick={() => { setActionId(inventory.id); setOpenEditInventory(true) }} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>

    )
}
