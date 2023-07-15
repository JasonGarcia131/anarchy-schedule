import axios from 'axios';
// const BASE_URL = 'https://anarchyschedule-api.onrender.com';

//Development
const BASE_URL = 'https://anarchyschedule-api.onrender.com';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});