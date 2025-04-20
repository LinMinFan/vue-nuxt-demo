import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getCategories = () => {
    return url.get('categories.json');
};

export default {
    getCategories,
};