import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getLatestEvents = () => {
    return url.get('latest-events.json');
};

export default {
    getLatestEvents,
};