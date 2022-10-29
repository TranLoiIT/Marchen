const URL_API = process.env.BROWSER_API_URL;
import axios from "~/utils/axios";

//admim
export const getItem = (params) => axios.get(`${URL_API}/items`, { params });

export const createItem = (data) => axios.post(`${URL_API}/items`, data);

export const getIdItem = (id) => axios.get(`${URL_API}/items/${id}`);

export const updateItem = (id, data) => axios.put(`${URL_API}/items/${id}`, data);

export const deleteItem = (id) => axios.delete(`${URL_API}/items/${id}`);
