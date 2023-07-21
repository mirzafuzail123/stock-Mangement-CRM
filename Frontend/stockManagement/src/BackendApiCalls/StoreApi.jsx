import BackendInstance from "../utils/BackendInstance"


// Store list
export const StoreListFunc = async () => {
    const response = await BackendInstance.get('/inventory/store/')
    return response.data
}


// Create Store'
export const CreateStoreFunc = async (data) => {
    const response = await BackendInstance.post('/inventory/createstore/', data)
    return response.data
}