import BackendInstance from "../utils/BackendInstance"



// Store list without pagination
export const SupplierListFunc = async (store) => {
    const response = await BackendInstance.get('/inventory/supplierList/', { params: { "store": store } })
    return response.data
}

// Supplier List With Pagination
export const AllSuppliersFunc = async (page, store, searchValue) => {
    const response = await BackendInstance.get('/inventory/suppliers/', { params: { "page": page, "store": store, "search": searchValue } })
    return response.data
}


export const CreateSupplierFunc = async (data) => {
    const response = await BackendInstance.post('/inventory/suppliers/', data)
    return response.data
}



// Single Supplier
export const SingleSupplierFunc = async (id) => {
    const response = await BackendInstance.get(`/inventory/singleSupplier/${id}/`)
    return response.data
}


// Update Supplier
export const UpdateSupplierFunc = async (id, data) => {
    const response = await BackendInstance.patch(`/inventory/singleSupplier/${id}/`, data)
    return response.data
}



