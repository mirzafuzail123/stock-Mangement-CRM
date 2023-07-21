import BackendInstance from "../utils/BackendInstance"

// Inventory List
export const DashboardDataFunc = async (store, fromFilterDate, toFilterDate, dataType) => {
    const response = await BackendInstance.get('/dashboard/', { params: { "store": store, "fromFilterDate": fromFilterDate, "toFilterDate": toFilterDate, "dataType": dataType, } })
    return response.data
}