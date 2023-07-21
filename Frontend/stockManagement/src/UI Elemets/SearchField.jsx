import React from 'react'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import GlobalStateContext from '../Context/GlobalStateContext'

export default function SearchField() {

    const { setSearchValue, setParentLoading } = useContext(GlobalStateContext)

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            setSearchValue(e.target.value)
            setParentLoading(true)
        }
    }


    return (
        <div className={`flex lg:w-72 items-center border-2 text-sm  py-2 px-2 rounded-sm`}>
            <FontAwesomeIcon icon={faSearch} className='text-gray-500' />
            <input
                required
                onKeyDown={handleEnter}
                className="pl-2 outline-none w-full border-none bg-gray-100"
                type="text"
                name="Search"
                placeholder="Search" />
        </div>

    )
}
