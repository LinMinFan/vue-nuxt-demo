// api/product/products.js
import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getProducts = () => {
    return url.get('products.json');
};

export default {
    getProducts,
};