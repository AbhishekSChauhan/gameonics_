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

const forgotPassword = async(email) => {
    axios.patch('/forgot_password', email)
}

const resetPassword = async(password_reset_token, user) => {
    axios.patch("/reset_password",{password_reset_token, user})
}

const authApi = {
    login,
    logout,
    signup,
    forgotPassword,
    resetPassword,
}

export default authApi;