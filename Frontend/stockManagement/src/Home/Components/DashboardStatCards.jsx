import React from 'react';
import { useContext } from 'react';
import NoOfOrdersLogo from '../../assets/NoOfOrdersLogo.png'
import SaleAmountLogo from '../../assets/SaleAmountLogo.png'
import ReturnLogo from '../../assets/ReturnLogo.png'
import PurchaseAmountLogo from '../../assets/PurchaseAmountLogo.png'
import GlobalStateContext from '../../Context/GlobalStateContext';

export default function DashboardStatCards({ totalOrders, totalReturns, totalPurchaseAmount, totalSaleAmount }) {

    const { formatNumber } = useContext(GlobalStateContext)

    const cardData = [
        { 'label': 'N.o of Orders', 'data': totalOrders, "logo": NoOfOrdersLogo },
        { 'label': 'N.o of Returns', 'data': totalReturns, "logo": ReturnLogo },
        { 'label': 'Net Purchase', 'data': `Rs. ${formatNumber(totalPurchaseAmount)}`, "logo": PurchaseAmountLogo },
        { 'label': 'Net Sale', 'data': `Rs. ${formatNumber(totalSaleAmount)}`, "logo": SaleAmountLogo },
    ]

    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 pb-24 mx-auto">
                <div className="flex flex-wrap -m-4 text-center">

                    {/* Card */}
                    {cardData.map((data, index) => (
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full" key={index}>
                            <div className="border-2 border-primary px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                                <img src={data.logo} className='w-12 mx-auto relative bottom-2' />
                                <h2 className="title-font font-medium text-2xl text-gray-900">{data.data}</h2>
                                <p className="leading-relaxed text-sm">{data.label}</p>
                            </div>
                        </div>))}


                </div>
            </div>
        </section>
    );
}


