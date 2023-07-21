import React from 'react'
import InventoryCountChart from './InventoryCountChart'
import { useEffect, useState, useContext } from 'react'
import { AllInventoryListFunc } from '../../BackendApiCalls/InventoryApi'
import GlobalStateContext from '../../Context/GlobalStateContext'
import Loader from '../../Partials/Loader'
import SalesVsPurchaseChart from './SalesVsPurchaseChart'
import DashboardStatCards from './DashboardStatCards'
import HomeHeader from '../Partials/HomeHeader'
import { DashboardDataFunc } from '../../BackendApiCalls/DashboardApi'

export default function Home() {

    const { SelectedStore } = useContext(GlobalStateContext)

    const [loading, setloading] = useState(true)

    const [InventoryData, setInventoryData] = useState([])
    const [totalOrders, settotalOrders] = useState(0)
    const [totalReturns, settotalReturns] = useState(0)
    const [totalPurchaseAmount, settotalPurchaseAmount] = useState(0.0)
    const [totalSaleAmount, settotalSaleAmount] = useState(0.0)

    const [DataType, setDataType] = useState(null)
    const [FromFilterDate, setFromFilterDate] = useState(null)
    const [ToFilterDate, setToFilterDate] = useState(null)



    useEffect(() => {

        if (SelectedStore) {
            DashboardDataFunc(SelectedStore.id, FromFilterDate, ToFilterDate, DataType).then((data) => {
                setInventoryData(data.inventoryData)
                settotalOrders(data.totalOrders)
                settotalReturns(data.totalReturns)
                settotalPurchaseAmount(data.totalPurchaseAmount)
                settotalSaleAmount(data.totalSaleAmount)
                setTimeout(() => {
                    setloading(false)
                }, 1000)
            })

        }
        else {
            setTimeout(() => {
                setloading(false)
            }, 1000);
        }
    }, [SelectedStore, FromFilterDate, ToFilterDate, DataType])

    return (
        loading ? <Loader /> : <>

            {/* Header */}
            <HomeHeader FromFilterDate={FromFilterDate} setloading={setloading} setFromFilterDate={setFromFilterDate} ToFilterDate={ToFilterDate} setToFilterDate={setToFilterDate} DataType={DataType} setDataType={setDataType} />

            <div className=''>
                <DashboardStatCards
                    totalPurchaseAmount={totalPurchaseAmount}
                    totalOrders={totalOrders}
                    totalSaleAmount={totalSaleAmount}
                    totalReturns={totalReturns}
                />
            </div>

            <div className='flex sm:flex-col lg:flex-row xs:space-y-10 lg:space-y-0 lg:justify-between px-2 pb-5'>
                {/* <div className="w-[20rem]">
                    <InventoryCountChart
                        InventoryData={InventoryData} />
                </div> */}

                <div className='min-w-[50%]'>
                    <SalesVsPurchaseChart
                        InventoryData={InventoryData}
                    />
                </div>

            </div>

        </>
    )
}
