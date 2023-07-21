import React from 'react'
import { useState } from 'react'
import { primaryButton } from '../../Partials/Styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import SearchField from '../../UI Elemets/SearchField'
import AddReturnModal from '../Modals/AddReturnModal'

export default function ReturnHeader() {

    const [OpenAddReturn, setOpenAddReturn] = useState(false)
    return (
        <>
            <AddReturnModal Modal={OpenAddReturn} setModal={setOpenAddReturn} />
            <div className='lg:flex  xs:space-y-5 lg:space-y-0 justify-between mt-6 w-full'>
                {/* Search FIeld */}

                <div>
                    <SearchField />
                </div>
                <div>
                    <button onClick={() => setOpenAddReturn(true)} type={'button'} className={`${primaryButton}`} > <FontAwesomeIcon icon={faAdd} className='pr-1' /> Add Return</button>
                </div>
            </div>
        </>
    )
}
