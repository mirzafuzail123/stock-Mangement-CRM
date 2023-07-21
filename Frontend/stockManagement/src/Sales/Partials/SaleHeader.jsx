import React from 'react'
import { useState } from 'react'
import { primaryButton } from '../../Partials/Styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import SearchField from '../../UI Elemets/SearchField'
import AddSaleModal from '../Modals/AddSaleModal'
import AddCommonSaleExpenseModal from '../Modals/AddCommonSaleExpenseModal'

export default function SaleHeader() {

    const [OpenAddSale, setOpenAddSale] = useState(false)
    const [OpenAddCommonExpense, setOpenAddCommonExpense] = useState(false)
    return (
        <>
            {OpenAddSale && <AddSaleModal Modal={OpenAddSale} setModal={setOpenAddSale} />}
            <AddCommonSaleExpenseModal Modal={OpenAddCommonExpense} setModal={setOpenAddCommonExpense} />
            <div className='lg:flex  xs:space-y-5 lg:space-y-0 justify-between mt-6 w-full'>
                {/* Search FIeld */}

                <div>
                    <SearchField />
                </div>
                <div className='space-x-5'>
                    <button onClick={() => setOpenAddCommonExpense(true)} type={'button'} className={`${primaryButton}`} >  Merge Expenses</button>
                    <button onClick={() => setOpenAddSale(true)} type={'button'} className={`${primaryButton}`} > <FontAwesomeIcon icon={faAdd} className='pr-1' /> Add Sale</button>
                </div>
            </div>
        </>
    )
}
