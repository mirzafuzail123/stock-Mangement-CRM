import React from 'react'
import { useState, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRemove } from "@fortawesome/free-solid-svg-icons"
import NotFound from "../../Partials/NotFound"
import RemoveUserModal from '../Modals/RemoveUserModal'

export default function UserListTable({ data }) {


    const [OpenRemoveUser, setOpenRemoveUser] = useState(false)
    const [UserName, setUserName] = useState(null)
    const [ActionId, setActionId] = useState(null)

    return (
        <>
            {OpenRemoveUser && <RemoveUserModal Modal={OpenRemoveUser} setModal={setOpenRemoveUser} userId={ActionId} setuserId={setActionId} UserName={UserName} />}
            <table className="table-auto w-full ">
                <thead>
                    <tr className="text-left  bg-slate-700 text-xs [&>th]:text-white  [&>th]:font-semibold [&>th]:uppercase [&>th]:px-6 [&>th]:py-4 ">
                        <th>#</th>
                        <th>User</th>
                        <th>User Type </th>
                        <th className="relative right-2">Action</th>
                    </tr>
                </thead>
                {/* Body */}
                <tbody className=''>
                    {data.length === 0 ? <tr><td colSpan={7}>  <NotFound /></td> </tr> : data.map((user, index) => {
                        return (
                            <tr key={index} className={`text-sm [&>td]:px-6 [&>td]:py-4 ${index % 2 == 0 && 'bg-gray-100'}  `}>
                                <td>{index + 1}</td>
                                <td className='font-semibold'>{user.user}</td>
                                <td className=''>{user.userRole}</td>

                                <td className='flex space-x-3'>
                                    <FontAwesomeIcon
                                        icon={faRemove}
                                        className="text-primary cursor-pointer"
                                        onClick={() => { setUserName(user.user); setOpenRemoveUser(true); setActionId(user.id) }} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>

    )
}
