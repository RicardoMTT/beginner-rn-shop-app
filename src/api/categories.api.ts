import axios from 'axios';
const baseURL = 'https://fakestoreapi.com/products';

const categoriesApi = axios.create({baseURL});

export default categoriesApi;
