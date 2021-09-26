import axios from "axios";

const list = () => axios.get("/blogs");

const show = (id) => axios.get(`/blogs/${id}`);

const create = (payload) => axios.post("/blogs/", payload);

const update = ({ id, payload }) => axios.put(`/blogs/${id}`, payload);

const destroy = (id) => axios.delete(`/blogs/${id}`);

const bannerImage = async(id, blog) => {
  return axios.patch(`/blogs/${id}/banner_image`,blog,
  {headers:{'Content-Type':'multipart/form-data'}}
  )
}

const blogsApi = {
  list,
  show,
  create,
  update,
  destroy,
  bannerImage
};

export default blogsApi;