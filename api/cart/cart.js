// api/cart/cart.js
import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getCart = () => {
    return url.get('cart.json');
};

export default {
    getCart,
};
