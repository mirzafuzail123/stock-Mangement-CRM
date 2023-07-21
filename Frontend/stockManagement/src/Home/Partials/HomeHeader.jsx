import React from 'react'
import { useState, useContext } from 'react';
import GlobalStateContext from '../../Context/GlobalStateContext';
import FilterLogo from '../../assets/FilterLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import FilterModal from '../../Modals/FilterModal';


export default function HomeHeader({ FromFilterDate, setFromFilterDate, setloading, ToFilterDate, setToFilterDate, DataType, setDataType }) {

    const { formatDate } = useContext(GlobalStateContext)
    const [OpenFilterModal, setOpenFilterModal] = useState(false)

    const userRole = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).userType


    return (
        <>
            <FilterModal
                Modal={OpenFilterModal}
                setModal={setOpenFilterModal}
                setloading={setloading}
                FromFilterDate={FromFilterDate}
                setFromFilterDate={setFromFilterDate}
                ToFilterDate={ToFilterDate}
                setToFilterDate={setToFilterDate}
                DataType={DataType}
                setDataType={setDataType} />

            <div className='flex justify-end mt-6 mb-10 px-3'>
                <div className='flex space-x-6'>
                    {/* Date Filter */}
                    {FromFilterDate && ToFilterDate &&
                        <div className='flex space-x-3 bg-slate-700  py-1 px-3 rounded-full text-xs text-white'>
                            <span>{formatDate(FromFilterDate)} - {formatDate(ToFilterDate)}</span>
                            <span className='cursor-pointer' onClick={() => { setFromFilterDate(null); setToFilterDate(null); setloading(true) }}><FontAwesomeIcon icon={faClose} /></span>
                        </div>
                    }

                    {DataType &&
                        <div className='flex space-x-3 bg-slate-700  py-1 px-3 rounded-full text-xs text-white'>
                            <span>{DataType}</span>
                            <span className='cursor-pointer' onClick={() => { setDataType(null); setloading(true) }}><FontAwesomeIcon icon={faClose} /></span>
                        </div>
                    }
                    <div className='relative'>
                        <img src={FilterLogo} onClick={() => setOpenFilterModal(true)} className='w-7  cursor-pointer' />
                        {(userRole === "Admin" && FromFilterDate && ToFilterDate || DataType) &&
                            <span
                                onClick={() => { setFromFilterDate(null); setToFilterDate(null); setDataType(null); setloading(true) }}
                                className='flex justify-center pt-[2.2px] cursor-pointer absolute bottom-5 left-5 bg-slate-700 text-[0.65rem] rounded-full w-4 h-4'>
                                <FontAwesomeIcon icon={faClose} className="text-white" />
                            </span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
