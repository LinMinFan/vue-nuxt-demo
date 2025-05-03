// api/member/wishlist.js
import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getWishlist = () => {
    return url.get('wishlist.json');
};

export default {
    getWishlist,
};