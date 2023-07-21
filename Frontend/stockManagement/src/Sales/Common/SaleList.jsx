import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { SaleListFunc } from '../../BackendApiCalls/SaleApi'
import GlobalStateContext from '../../Context/GlobalStateContext'
import SaleHeader from '../Partials/SaleHeader'
import SaleListTable from './SaleListTable'
import Loader from '../../Partials/Loader'
import FilterLogo from '../../assets/FilterLogo.png'
import FilterModal from '../../Modals/FilterModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function SaleList({ component }) {

    const { CalculatePagination, SearchValue, setSearchValue, dummyState, SelectedStore, setSaleType, formatDate, ParentLoading, setParentLoading } = useContext(GlobalStateContext)

    const [loading, setloading] = useState(true)
    const [totalEntries, settotalEntries] = useState(0)
    const [PageNumber, setPageNumber] = useState(1)
    const [PageOptionList, setPageOptionList] = useState([])

    const [SaleData, setSaleData] = useState([])

    const [OpenFilterModal, setOpenFilterModal] = useState(false)
    const [FromFilterDate, setFromFilterDate] = useState(null)
    const [ToFilterDate, setToFilterDate] = useState(null)

    // Searching Data
    useEffect(() => {
        setSearchValue(null)
    }, [])


    useEffect(() => {
        setSaleType(component)
        if (SelectedStore) {
            SaleListFunc(PageNumber, SelectedStore.id, component, FromFilterDate, ToFilterDate, SearchValue).then((data) => {
                setSaleData(data.results)
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


    }, [PageNumber, dummyState, SelectedStore, FromFilterDate, ToFilterDate, SearchValue])


    return (
        <>
            {/* Filter Modal */}
            <FilterModal
                Modal={OpenFilterModal}
                setModal={setOpenFilterModal}
                setloading={setloading}
                FromFilterDate={FromFilterDate}
                setFromFilterDate={setFromFilterDate}
                ToFilterDate={ToFilterDate}
                setToFilterDate={setToFilterDate} />

            {/* header */}
            <div className='w-full'>
                <SaleHeader />
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

                    {/* Filter */}
                    <div className='flex space-x-6'>
                        {/* Date Filter */}
                        {FromFilterDate && ToFilterDate &&
                            <div className='flex space-x-3 bg-slate-700  py-1 px-3 rounded-full text-xs text-white'>
                                <span>{formatDate(FromFilterDate)} - {formatDate(ToFilterDate)}</span>
                                <span className='cursor-pointer' onClick={() => { setFromFilterDate(null); setToFilterDate(null); setloading(true) }}><FontAwesomeIcon icon={faClose} /></span>
                            </div>
                        }
                        <img src={FilterLogo} onClick={() => setOpenFilterModal(true)} className='w-7 cursor-pointer' />
                    </div>

                </div>
                {/* Table */}
                <div className=' w-full h-full '>
                    <SaleListTable
                        data={SaleData}
                    />
                </div>
            </div>
            }


        </>
    )
}
