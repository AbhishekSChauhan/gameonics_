import axios from "axios";

const userImage = async(id, user) => {    
    return axios.patch(`/users/${id}/update_image`,user)
}

const fetchUser = async(id)=> {
    return axios.get(`/users/${id}`)
}

const usersApi = {
  userImage,
  fetchUser,
};

export default usersApi;