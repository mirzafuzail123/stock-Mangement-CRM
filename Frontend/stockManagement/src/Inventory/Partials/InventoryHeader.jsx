import React from 'react'
import { useState } from 'react'
import { primaryButton } from '../../Partials/Styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import SearchField from '../../UI Elemets/SearchField'
import AddInventoryModal from '../Modals/AddInventoryModal'

export default function InventoryHeader() {

    const [OpenAddInventory, setOpenAddInventory] = useState(false)
    return (
        <>
            <AddInventoryModal Modal={OpenAddInventory} setModal={setOpenAddInventory} />
            <div className='lg:flex  xs:space-y-5 lg:space-y-0 justify-between mt-6 w-full'>
                {/* Search FIeld */}

                <div>
                    <SearchField />
                </div>
                <div>
                    <button onClick={() => setOpenAddInventory(true)} type={'button'} className={`${primaryButton}`} > <FontAwesomeIcon icon={faAdd} className='pr-1' /> Add Inventory</button>
                </div>
            </div>
        </>
    )
}
