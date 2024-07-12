const express = require('express');
const router = express.Router();
const { createBooking, getRoomBookings, confirmBooking, getBookingsByCustomerId, getBookingsByOwnerId, getAllBookings } = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createBooking);
router.get('/room/:roomId', getRoomBookings);
router.post('/confirm', confirmBooking);
router.get('/customer/:customerId', getBookingsByCustomerId);
router.get('/owner/:ownerId', getBookingsByOwnerId);
router.get('/getbooking', getAllBookings);

module.exports = router;
