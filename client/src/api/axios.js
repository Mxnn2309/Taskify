import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://taskify-server-blond.vercel.app', 
    withCredentials: true,
});

export default instance;