import axios from "axios";

const list = () => axios.get("/blogs");

const show = (id) => axios.get(`/blogs/${id}`);

const create = (payload) => axios.post("/blogs/", payload);

const update = ({ id, payload }) => axios.put(`/blogs/${id}`, payload);

const destroy = (id) => axios.delete(`/blogs/${id}`);

const blogsApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default blogsApi;