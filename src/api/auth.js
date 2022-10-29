const URL_API = process.env.BROWSER_API_URL;
import axios from "~/utils/axios";

export const login = (credentials) => axios.post(`${URL_API}/login`, credentials)
     .then(({ data }) => {
          axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
          return data;
     }
);

export const logout = () => axios.post(`${URL_API}/logout`);
 