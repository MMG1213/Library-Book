import axios from 'axios';

const API = axios.create({
  baseURL: 'https://library-backend-f9bh.onrender.com', 
});

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/users/register', data);
export const getUser = (username) => API.get(`/users/${username}`);
export const getBooks = () => API.get('/books/');
export const reserveBook = (book_id, data) => API.post(`/books/${book_id}/reserve`, data);
