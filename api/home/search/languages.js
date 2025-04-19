import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getLanguages = () => {
    return url.get('languages.json');
};

export default {
    getLanguages,
};