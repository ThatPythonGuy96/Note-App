import axios from "axios"

export const BASE_URL = 'https://femiduyile.pythonanywhere.com';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers:{
        'Content-Type':'appliication/json',
    },
});

export default api