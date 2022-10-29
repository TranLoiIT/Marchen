const URL_API = process.env.BROWSER_API_URL;
import axios from "~/utils/axios";

export const changePassword = (id, data) => axios.put(`${URL_API}/users/${id}`, data);
 