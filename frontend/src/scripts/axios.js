import axios from 'axios';

const backendAxios = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 2000,
    responseType: 'json',
})

export { backendAxios }