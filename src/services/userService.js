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

export {handleLogin, getAllUsers,createNewUserService}