import axios from "axios";

const userImage = async(id, user) => {
    let login
    if (sessionStorage.getItem('user')){
        login = JSON.parse(sessionStorage.getItem('user'))
    }
    return axios.patch(`/users/${id}/update_image`,user,
    {headers:{'Content-Type':'multipart/form-data', Authorization:login.token}}
    )
}

const fetchUser = async(id)=> {
    axios.get(`/users/${id}`)
}

const usersApi = {
  userImage,
  fetchUser,
};

export default usersApi;