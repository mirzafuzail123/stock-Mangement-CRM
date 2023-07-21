import BackendInstance from "../utils/BackendInstance"


// Return List
export const ReturnListFunc = async (page, store, returnType, fromFilterDate, toFilterDate, searchValue) => {
    const response = await BackendInstance.get('/return/returnList/', { params: { "page": page, "store": store, "returnType": returnType, "search": searchValue, "fromDateFilter": fromFilterDate, "toDateFilter": toFilterDate } })
    return response.data
}


// Create Return
export const CreateReturnFunc = async (data) => {
    const response = await BackendInstance.post('/return/createReturn/', data)
    return response.data
}
