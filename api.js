import axios from "axios"

export const BASE_URL = 'http://192.168.43.226:8000';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers:{
        'Content-Type':'appliication/json',
    },
});

export default api