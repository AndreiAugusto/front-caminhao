import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://back-caminhao.vercel.app',
    headers: {
        "Content-Type": "application/json"
    }
});
