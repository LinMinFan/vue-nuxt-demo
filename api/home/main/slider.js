import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getSlider = () => {
    return url.get('slider.json');
};

export default {
    getSlider,
};