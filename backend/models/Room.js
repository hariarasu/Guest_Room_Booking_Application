const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  floorSize: { type: Number, required: true },
  numberOfBeds: { type: Number, required: true },
  amenities: { type: [String], required: true },
  minBookingDays: { type: Number, required: true },
  maxBookingDays: { type: Number, required: true },
  rentPerDay: { type: Number, required: true },
  photos: { type: [String], required: true },
  bookings: [{
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  }],
});

module.exports = mongoose.model('Room', RoomSchema);
