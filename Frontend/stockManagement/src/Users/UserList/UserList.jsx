import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { UserListFunc } from '../../BackendApiCalls/AuthApi'
import GlobalStateContext from '../../Context/GlobalStateContext'
import SearchField from '../../UI Elemets/SearchField'
import UserHeader from '../Partials/UserHeader'
import UserListTable from './UserListTable'
import Loader from '../../Partials/Loader'

export default function UserList() {

    const { CalculatePagination, SearchValue, setSearchValue, dummyState, SelectedStore, ParentLoading, setParentLoading } = useContext(GlobalStateContext)

    const [loading, setloading] = useState(true)
    const [totalEntries, settotalEntries] = useState(0)
    const [PageNumber, setPageNumber] = useState(1)
    const [PageOptionList, setPageOptionList] = useState([])

    const [UserData, setUserData] = useState([])


    // Searching Data
    useEffect(() => {
        setSearchValue(null)
    }, [])


    useEffect(() => {
        if (SelectedStore) {
            UserListFunc(PageNumber, SelectedStore.id, SearchValue).then((data) => {
                setUserData(data.results)
                settotalEntries(data.count)
                setPageOptionList(CalculatePagination(data.count, 15))
                setTimeout(() => {
                    setParentLoading(false)
                    setloading(false)
                }, 1000);
            })
        }
        else {
            setTimeout(() => {
                setParentLoading(false)
                setloading(false)
            }, 1000);
        }


    }, [PageNumber, dummyState, SelectedStore, SearchValue])


    return (
        <>
            {/* header */}
            <div className='w-full'>
                <UserHeader />
            </div>

            {(loading || ParentLoading) ? <Loader /> : <div className='bg-white space-y-5 py-5  w-full h-[74vh] mx-auto  my-8 rounded-md shadow-xl px-5 overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar  '>
                {/* Card header */}
                <div className='flex justify-between px-3 pt-1'>
                    {/* Pagination */}
                    <div className='flex  space-x-2 text-sm font-medium'>
                        <h1 className=''>Showing</h1>
                        <select
                            onChange={(e) => { setPageNumber(parseInt(e.target.value) + 1) }}
                            className="bg-gray-50 h-6 border rounded-sm px-1 border-gray-300 text-gray-900 sm:text-sm focus:outline-none block ">
                            {PageOptionList.map((option, index) => {
                                return (
                                    <option key={index} value={index}>{option.fromRecord} - {option.toRecord}</option>
                                )
                            }
                            )
                            }
                        </select>
                        <h1>out of  {totalEntries}</h1>
                    </div>

                </div>
                {/* Table */}
                <div className=' w-full h-full '>
                    <UserListTable
                        data={UserData}
                    />
                </div>
            </div>
            }


        </>
    )
}
