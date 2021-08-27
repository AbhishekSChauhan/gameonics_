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

const authApi = {
    login,
    logout,
    signup
}

export default authApi;