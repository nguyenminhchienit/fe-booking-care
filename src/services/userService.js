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

export {handleLogin, getAllUsers,createNewUserService,deleteUserService,editUserService}