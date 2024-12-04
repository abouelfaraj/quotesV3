import axios from 'axios';
import config from '../config';
import Cookies from 'js-cookie';

const client = axios.create({
    baseURL: config.baseURL,
});

client.interceptors.request.use(async (config) => {
    const csrftoken = Cookies.get('csrftoken');
    if (csrftoken) {
        config.withCredentials = true;
        config.headers['X-CSRFToken'] = csrftoken;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default client;