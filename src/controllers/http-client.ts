import axios from 'axios';
import { BASE_URI } from '../../config';

export const httpClient = axios.create({
    baseURL: BASE_URI,
});

httpClient.defaults.headers.post['Content-Type'] = 'application/json';
