import axios from 'axios';

const OAUTH_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: OAUTH_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export { api };