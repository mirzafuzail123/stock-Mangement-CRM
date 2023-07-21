import BackendInstance from "../utils/BackendInstance"



// Store list
export const PurchaseListFunc = async (page, store, fromFilterDate, toFilterDate, searchValue) => {
    const response = await BackendInstance.get('/purchase/purchaseList/', { params: { "page": page, "store": store, "search": searchValue, "fromDateFilter": fromFilterDate, "toDateFilter": toFilterDate } })
    return response.data
}


// single Purchase
export const SinglePurchaseFunc = async (id) => {
    const response = await BackendInstance.get(`/purchase/singlePurchase/${id}`)
    return response.data
}


// Create Purchase
export const CreatePurchaseFunc = async (data) => {
    const response = await BackendInstance.post('/purchase/createPurchase/', data)
    return response.data
}


// add Common Expense Purchase
export const AddCommonPurchaseExpenseFunc = async (data) => {
    const response = await BackendInstance.post('/purchase/addCommonPurchaseExpense/', data)
    return response.data
}


// add Common Expense Purchase
export const AddSinglePurchaseExpenseFunc = async (data, id) => {
    const response = await BackendInstance.patch(`/purchase/addSinglePurchaseExpense/${id}/`, data)
    return response.data
}