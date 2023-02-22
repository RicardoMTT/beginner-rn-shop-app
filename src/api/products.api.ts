import axios from 'axios';
const baseURL = 'https://fakestoreapi.com';

const productsApi = axios.create({baseURL});

export default productsApi;
