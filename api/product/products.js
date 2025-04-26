// api/product/products.js
import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getProducts = () => {
    return url.get('cart.json');
};

const productDetails = (id) => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return undefined;
    return products.find(item => item.id === parsedId);
}

export default {
    getProducts,
    productDetails
};