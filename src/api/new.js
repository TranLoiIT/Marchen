const URL_API = process.env.BROWSER_API_URL;
import axios from "~/utils/axios";

//admim
export const getPost = (params) => axios.get(`${URL_API}/posts`, { params });

export const createPost = (data) => axios.post(`${URL_API}/posts`, data);

export const getIdPost = (id) => axios.get(`${URL_API}/posts/${id}`);

export const updatePost = (id, data) => axios.put(`${URL_API}/posts/${id}`, data);

export const deletePost = (id) => axios.delete(`${URL_API}/posts/${id}`);
