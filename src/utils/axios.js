import axios from 'axios';
import cookie from 'js-cookie';

const token = cookie.get('token');

let options = {
     baseURL: process.env.BROWSER_API_URL,
};

if (token) {
     options = {
          ...options,
     };
     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default axios.create(options);
