const URL_API = process.env.BROWSER_API_URL;
import axios from "~/utils/axios";

//admim
export const getCategory = (params) => axios.get(`${URL_API}/categories`, { params });

export const createCategory = (data) => axios.post(`${URL_API}/categories`, data);

export const getIdCategory = (id) => axios.get(`${URL_API}/categories/${id}`);

export const updateCategory = (id, data) => axios.put(`${URL_API}/categories/${id}`, data);

export const deleteCategory = (id) => axios.delete(`${URL_API}/categories/${id}`);
