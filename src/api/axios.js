import axios from 'axios';

//Production
const BASE_URL = 'https://anarchyschedule-api.onrender.com';

//Development
// const BASE_URL = 'http://localhost:5000';


export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});