import BackendInstance from "../utils/BackendInstance"

// Inventory List
export const InventoryListFunc = async (page, store, searchValue) => {
    const response = await BackendInstance.get('/inventory/inventoryList/', { params: { "page": page, "store": store, "search": searchValue } })
    return response.data
}

// Inventory List without pagination
export const AllInventoryListFunc = async (store) => {
    const response = await BackendInstance.get('/inventory/allInventoryList/', { params: { "store": store } })
    return response.data
}

// Create Invetory
export const CreateInventoryFunc = async (data) => {
    const response = await BackendInstance.post('/inventory/createInventory/', data)
    return response.data
}

// Single Inventory
export const SingleInventoryFunc = async (id) => {
    const response = await BackendInstance.get(`/inventory/singleInventory/${id}/`)
    return response.data
}


// Update Inventory
export const UpdateInventoryFunc = async (id, data) => {
    const response = await BackendInstance.patch(`/inventory/singleInventory/${id}/`, data)
    return response.data
}

