import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getAnnouncement = () => {
    return url.get('announcement.json');
};

export default {
    getAnnouncement,
};