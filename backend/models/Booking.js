const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  metadata: {
    session_id: { type: String, required: true }
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
