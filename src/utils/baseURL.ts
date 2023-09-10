import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/darlio88/faker-server',
});

export default instance;
