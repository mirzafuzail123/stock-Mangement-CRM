import React from 'react'
import AgencyLogo from '../assets/AgencyLogo.png'

export default function Invoice({ InvoiceLabels, InvoiceLabelData, InvoiceData, InvoiceItemLabels, InvoiceItemData, InvoiceTotalAmountLabels, InvoiceTotalAmountData }) {


    return (
        <div>
            <div className="max-w-5xl mx-auto bg-white">
                <article className="overflow-hidden ">
                    <div className="bg-[white] px-2 rounded-b-md">
                        {/* Logo */}
                        <div className="pt-3 flex justify-center">
                            <img src={AgencyLogo} className='xs:h-10 xs:w-32 lg:h-10 lg:w-32' alt="" />
                        </div>
                        {/* Content */}
                        <div className="pt-7">
                            <div className="flex w-full">
                                <div className="flex justify-between w-full">
                                    <div className="text-sm space-y-3  font-semibold text-gray-500">
                                        {InvoiceLabels.map((label, index) => (
                                            <p key={index}>{label} :</p>
                                        ))}
                                    </div>
                                    <div className="text-sm space-y-3  font-medium text-gray-700">
                                        {InvoiceLabelData.map((data, index) => (
                                            <p key={index}>{data}</p>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="">
                            <div className="flex flex-col mx-0 mt-8">
                                <table className="min-w-full divide-y divide-slate-500">
                                    <thead>
                                        <tr className=''>
                                            <th scope="col" className="py-3.5 pl-4 pr-3   text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                                                {InvoiceItemLabels[0]}
                                            </th>
                                            <th scope="col" className="hidden py-3.5 px-3  text-center text-sm font-normal text-slate-700 sm:table-cell">
                                                {InvoiceItemLabels[1]}
                                            </th>
                                            <th scope="col" className="hidden py-3.5    text-right text-sm font-normal text-slate-700 sm:table-cell">
                                                {InvoiceItemLabels[2]}
                                            </th>
                                            {InvoiceItemLabels[3] && <th scope="col" className="hidden py-3.5   text-center text-sm font-normal text-slate-700 sm:table-cell">
                                                {InvoiceItemLabels[3]}
                                            </th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-slate-200">
                                            <td className="py-4  px-3 text-sm sm:pl-6 md:pl-0">
                                                <div className="font-medium text-slate-700">{InvoiceItemData[0]}</div>
                                            </td>
                                            <td className="relative px-3 py-4 text-sm text-center text-slate-500 sm:table-cell">
                                                {InvoiceItemData[1]}
                                            </td>
                                            <td className=" py-4 text-sm text-right text-slate-500 sm:table-cell">
                                                Rs. {InvoiceItemData[2]}
                                            </td>
                                            {InvoiceItemData[3] && <td className=" flex flex-col space-y-1 py-4 relative right-3 text-sm text-right text-slate-500 sm:table-cell">
                                                {InvoiceItemData[3] ? InvoiceItemData[3].split(/,|\s/).map((data, index) => (
                                                    <h1 key={index}>{data}</h1>
                                                )) : "-"}
                                            </td>
                                            }

                                        </tr>


                                    </tbody>
                                    <tfoot className=''>
                                        {InvoiceTotalAmountData[0].map((data) => (
                                            <tr className='whitespace-nowrap'>
                                                <th scope="row" colspan="3" className=" pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                                                    {data.expenseName}
                                                </th>

                                                <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                    Rs. {data.expenseAmount}
                                                </td>
                                            </tr>
                                        ))}


                                        <tr className='whitespace-nowrap'>
                                            <th scope="row" colspan="3" className=" pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                                                {InvoiceTotalAmountLabels[1]}
                                            </th>

                                            <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                Rs. {InvoiceTotalAmountData[1]}
                                            </td>
                                        </tr>

                                        <tr className='whitespace-nowrap'>
                                            <th scope="row" colspan="3" className=" pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                                                {InvoiceTotalAmountLabels[2]}
                                            </th>

                                            <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                Rs. {InvoiceTotalAmountData[2]}
                                            </td>
                                        </tr>

                                        <tr className='whitespace-nowrap'>
                                            <th scope="row" colspan="3" className=" pt-6 pl-6 pr-3 text-sm font-bold text-right text-slate-700 sm:table-cell md:pl-0">
                                                {InvoiceTotalAmountLabels[3]}
                                            </th>

                                            <td className="pt-4 pl-3 pr-4 text-sm font-bold text-right text-slate-700 sm:pr-6 md:pr-0">
                                                Rs. {InvoiceTotalAmountData[3]}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                    </div>
                </article>
            </div>
        </div>
    )
}
