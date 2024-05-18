import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://taskify-server-one.vercel.app/', 
    withCredentials: true,
});

export default instance;