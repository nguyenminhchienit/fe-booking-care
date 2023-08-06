import axios from "../axios"

let handleLogin = (userEmail,userPassword) => {
    return axios.post("/api/login", {email:userEmail ,password: userPassword})
}

let getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

let createNewUserService = (data) => {
    return axios.post("/api/create-new-user",data);
}

let deleteUserService = (userId) => {
    return axios.delete("/api/delete-user",{
        data: {
            id: userId
        }
    });
}

let editUserService = (inputData) => {
    return axios.put("/api/edit-user",inputData)
}

let getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

let getDoctor = (limit) => {
    return axios.get(`/api/get-doctor?type=${limit}`)
}

export {
    handleLogin, 
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getDoctor
}