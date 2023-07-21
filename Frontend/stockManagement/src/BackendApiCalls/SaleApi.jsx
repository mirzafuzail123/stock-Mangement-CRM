import BackendInstance from "../utils/BackendInstance"



// Store list
export const SaleListFunc = async (page, store, saleType, fromFilterDate, toFilterDate, searchValue) => {
    const response = await BackendInstance.get('/sale/saleList/', { params: { "page": page, "store": store, "saleType": saleType, "search": searchValue, "fromDateFilter": fromFilterDate, "toDateFilter": toFilterDate } })
    return response.data
}


// single Sale
export const SingleSaleFunc = async (id) => {
    const response = await BackendInstance.get(`/sale/singleSale/${id}`)
    return response.data
}


// Create Sale
export const CreateSaleFunc = async (data) => {
    const response = await BackendInstance.post('/sale/createSale/', data)
    return response.data
}


// add Common Expense Sale
export const AddCommonSaleExpenseFunc = async (data) => {
    const response = await BackendInstance.post('/sale/addCommonSaleExpense/', data)
    return response.data
}


// add Single Expense Sale
export const AddSingleSaleExpenseFunc = async (data, id) => {
    const response = await BackendInstance.patch(`/sale/addSingleSaleExpense/${id}/`, data)
    return response.data
}