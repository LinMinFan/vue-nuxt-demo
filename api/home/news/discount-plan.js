import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

const getDiscountPlan = () => {
    return url.get('discount-plan.json');
};

export default {
    getDiscountPlan,
};