import BackendInstance from "../utils/BackendInstance"



// Saving Auth Response
const SavingAuthResponse = (data) => {
    localStorage.setItem('authToken', JSON.stringify({ 'access_token': data.access_token, 'refresh_token': data.refresh_token }))
    localStorage.setItem('userData', JSON.stringify({ "user_id": data.user_id, "username": data.username, "userType": data.userRole }))
}

// Login Func
export const LoginUserFunc = async (data) => {
    const response = await BackendInstance.post('/user/login/', { data })
    SavingAuthResponse(response.data)
}

// Change Password 
export const ChangePasswordFunc = async (data) => {
    const response = await BackendInstance.post('/user/changePassword/', { data })
    return response.data
}


// User list
export const UserListFunc = async (page, store, searchValue) => {
    const response = await BackendInstance.get('/user/userList/', { params: { "page": page, "store": store, "search": searchValue } })
    return response.data
}


// User list for options
export const AllUsersFunc = async (store) => {
    const response = await BackendInstance.get('/user/allUsers/', { params: { "store": store } })
    return response.data
}

// Create User
export const CreateUserFunc = async (data) => {
    const response = await BackendInstance.post('/user/createUser/', data)
    return response.data
}

// User Update and Add store and permissions
export const UpdateUserPermissionFunc = async (userID, data) => {
    const response = await BackendInstance.patch(`/user/updateUserPermission/${userID}/`, data)
    return response.data
}



//  Remove User from store
export const RemoveFromStoreFunc = async (userID, store) => {
    const response = await BackendInstance.patch(`/user/removeFromStore/${userID}/`, { "store": store })
    return response.data
}