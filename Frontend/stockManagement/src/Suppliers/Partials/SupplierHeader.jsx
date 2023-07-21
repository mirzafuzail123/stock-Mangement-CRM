import React from 'react'
import { useState } from 'react'
import { primaryButton } from '../../Partials/Styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import SearchField from '../../UI Elemets/SearchField'
import AddSupplierModal from '../Modals/AddSupplierModal'

export default function SupplierHeader() {

    const [OpenAddSupplier, setOpenAddSupplier] = useState(false)
    return (
        <>
            <AddSupplierModal Modal={OpenAddSupplier} setModal={setOpenAddSupplier} />
            <div className='lg:flex  xs:space-y-5 lg:space-y-0 justify-between mt-6 w-full'>
                {/* Search FIeld */}

                <div>
                    <SearchField />
                </div>
                <div>
                    <button onClick={() => setOpenAddSupplier(true)} type={'button'} className={`${primaryButton}`} > <FontAwesomeIcon icon={faAdd} className='pr-1' /> Add Supplier</button>
                </div>
            </div>
        </>
    )
}
