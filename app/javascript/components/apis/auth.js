import axios from 'axios'

const login = (payload) => axios.post("/users/sign_in", payload);

const logout = () => axios.delete("/users/sign_out");

const signup = (payload) => axios.post("/users", payload);

const authApi = {
    login,
    logout,
    signup
}

export default authApi;