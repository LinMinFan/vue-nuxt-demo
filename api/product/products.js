const products = [
    { id: 1, category: 1, name: 'Macbook Pro 2022', price: 3200 , image: 'imgs/shop/thumbnail-1.jpg', stock: 10 },
    { id: 2, category: 1, name: 'iPhone 14 Pro Max', price: 1200 , image: 'imgs/shop/thumbnail-2.jpg', stock: 10 },
    { id: 3, category: 1, name: 'Apple Watch Serial 7', price: 800 , image: 'imgs/shop/thumbnail-3.jpg', stock: 10 },
    { id: 4, category: 1, name: 'iPad Pro 2022', price: 1500 , image: 'imgs/shop/thumbnail-4.jpg', stock: 10 },
    { id: 5, category: 1, name: 'AirPods Pro', price: 250 , image: 'imgs/shop/thumbnail-5.jpg', stock: 10 },
    { id: 6, category: 1, name: 'Apple Pencil', price: 100 , image: 'imgs/shop/thumbnail-6.jpg', stock: 10 },
    { id: 7, category: 1, name: 'Apple TV 4K', price: 200 , image: 'imgs/shop/thumbnail-7.jpg', stock: 10 },
    { id: 8, category: 1, name: 'HomePod Mini', price: 100 , image: 'imgs/shop/thumbnail-8.jpg', stock: 10 },
    { id: 9, category: 1, name: 'Magic Keyboard', price: 150 , image: 'imgs/shop/thumbnail-9.jpg', stock: 10 },
    { id: 10, category: 2, name: 'Magic Mouse', price: 100 , image: 'imgs/shop/category-thumb-1', stock: 10 },
    { id: 11, category: 2, name: 'Magic Trackpad', price: 150 , image: 'imgs/shop/category-thumb-2', stock: 10 },
    { id: 12, category: 2, name: 'Apple AirTag', price: 30 , image: 'imgs/shop/category-thumb-3', stock: 10 },
    { id: 13, category: 2, name: 'Apple Watch Band', price: 50 , image: 'imgs/shop/category-thumb-4', stock: 10 },
    { id: 14, category: 2, name: 'iPhone Case', price: 30 , image: 'imgs/shop/category-thumb-5', stock: 10 },
    { id: 15, category: 2, name: 'iPad Case', price: 50 , image: 'imgs/shop/category-thumb-6', stock: 10 },
    { id: 16, category: 2, name: 'Macbook Case', price: 50 , image: 'imgs/shop/category-thumb-7', stock: 10 },
    { id: 17, category: 2, name: 'Apple Watch Charger', price: 30 , image: 'imgs/shop/category-thumb-8', stock: 10 },
]

const productDetails = (id) => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return undefined;
    return products.find(item => item.id === parsedId);
}

export default {
    products,
    productDetails,
};