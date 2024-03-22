export const BASE_URL =
process.env.NODE_ENV === 'develeopment' ? 'http://localhost:5000' : '/';
// export const BASE_URL = 'http://localhost:5000';
export const PRODUCTS_URL = '/api/products';
export const ORDERS_URL = '/api/orders';
export const USERS_URL = '/api/users';
export const UPLOAD_URL = '/api/upload';

console.log(BASE_URL)