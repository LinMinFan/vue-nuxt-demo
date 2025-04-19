import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getdDscountPlan = () => {
    return url.get('discount-plan.json');
};

export default {
    getdDscountPlan,
};