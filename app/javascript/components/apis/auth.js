import axios from 'axios'

const login = (payload) => {
    sessionStorage.clear()
    return axios.post("/sessions", payload)
}

const logout = () => {
    let login
    if(sessionStorage.getItem('user')){
        login = JSON.parse(sessionStorage.getItem('user'));
        // console.log('login token', login.token)
    }
    sessionStorage.clear();
    return axios.delete("/logout");
}

const signup = (payload) => {
    sessionStorage.clear()
    return axios.post("/registrations", payload)
}



const forgotPassword = (email) => {
    return axios.patch('/forgot_password',{email} )
}

const resetPassword = (payload,user) => {
    return axios.patch("/change_password_with_token",{payload,user})
}

const loggedIn = () => {
    return axios.get("/logged_in",{ headers: { Authorization: user.token } })
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