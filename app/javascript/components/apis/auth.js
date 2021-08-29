import axios from 'axios'

const login = (payload) => {
    sessionStorage.clear()
    return axios.post("/sessions", payload)
}

const logout = () => {
    let login
    if(sessionStorage.getItem('user')){
        login = JSON.parse(sessionStorage.getItem('user'));
    }
    sessionStorage.clear();
    return axios.delete("/logout",null, { headers: { Authorization: login.token } });
}

const signup = (payload) => {
    sessionStorage.clear()
    return axios.post("/registrations", payload)
}

const forgotPassword = (payload) => {
    axios.patch('/forgot_password', payload)
}

const resetPassword = (payload) => {
    axios.patch("/reset_password",payload)
}

const loggedIn = () => {
    if(sessionStorage.getItem('user')){
        const user = JSON.parse(sessionStorage.getItem('user'))
        return axios.get("/logged_in",{ headers: { Authorization: user.token } })
    }
}

const authApi = {
    login,
    logout,
    signup,
    forgotPassword,
    resetPassword,
    loggedIn
}

export default authApi;