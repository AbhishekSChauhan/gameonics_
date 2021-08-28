import axios from 'axios'

const login = async(payload) => {
    sessionStorage.clear()
    return axios.post("/sessions", payload)
}

const logout = () => axios.delete("/users/sign_out");

const signup = async(payload) => {
    sessionStorage.clear()
    return axios.post("/registrations", payload)
}

const forgotPassword = async(payload) => {
    axios.patch('/forgot_password', payload)
}

const resetPassword = async(payload) => {
    axios.patch("/reset_password",payload)
}

const authApi = {
    login,
    logout,
    signup,
    forgotPassword,
    resetPassword,
}

export default authApi;