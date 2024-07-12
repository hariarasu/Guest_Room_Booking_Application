import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const createRoom = (formData) => API.post('/rooms/createroom', formData);
export const getAllRooms = () => API.get('/rooms/getroom');
export const getRoomById = (roomId) => API.get(`/rooms/${roomId}`);
export const createBooking = (formData) => API.post('/bookings', formData);
export const getRoomBookings = (roomId) => API.get(`/bookings/room/${roomId}`);
export const confirmBooking = (formData) => API.post('/bookings/confirm', formData);
export const getBookingsByCustomerId = (customerId) => API.get(`/bookings/customer/${customerId}`);
export const getRoomsByOwnerId = (ownerId) => API.get(`/rooms/owner/${ownerId}`);
export const getBookingsByOwnerId = (ownerId) => API.get(`/bookings/owner/${ownerId}`);
export const updateRoom = (roomId, formData) => API.put(`/rooms/update/${roomId}`, formData);
export const deleteRoom = (roomId) => API.delete(`/rooms/delete/${roomId}`);
export const getAllBookings = () => API.get('/bookings/getbooking');



export default API;
