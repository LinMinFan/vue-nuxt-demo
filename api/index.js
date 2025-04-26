// api/index.js
import languagesRequest from './home/search/languages.js';
import categoriesRequest from './home/search/categories.js';
import latestEventsRequest from './home/news/latest-events.js';
import discountPlanRequest from './home/news/discount-plan.js';
import announcementRequest from './home/news/announcement.js';
import cartRequest from './cart/cart.js';
import productRequest from './product/products.js';
import sliderRequest from './home/main/slider.js';

export const languagesApi = languagesRequest;
export const categoriesApi = categoriesRequest;
export const latestEventsApi = latestEventsRequest;
export const discountPlanApi = discountPlanRequest;
export const announcementApi = announcementRequest;
export const cartApi = cartRequest;
export const productApi = productRequest;
export const sliderApi = sliderRequest;