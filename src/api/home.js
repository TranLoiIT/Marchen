const URL_API = process.env.BROWSER_API_URL;
import axios from "~/utils/axios";

// home
export const getItem = (params) => axios.get(`${URL_API}/home/items`, { params });

export const getIdItem = (id) => axios.get(`${URL_API}/home/item/${id}`);

export const getPost = (params) => axios.get(`${URL_API}/home/posts`, { params });

export const getIdPost = (id) => axios.get(`${URL_API}/home/post/${id}`);

export const getCategories = (params) => axios.get(`${URL_API}/home/categories`, { params });
