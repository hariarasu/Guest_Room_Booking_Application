const Booking = require('../models/Booking');
const Room = require('../models/Room');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createBooking = async (req, res) => {
  const { room, startDate, endDate, totalAmount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Room Booking',
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        room,
        customer: req.user.id,
        startDate,
        endDate,
        totalAmount, // Store totalAmount in metadata
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.confirmBooking = async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      const { room, customer, startDate, endDate, totalAmount } = session.metadata;

      // Check if the booking already exists based on session ID to prevent duplicates
      const existingBooking = await Booking.findOne({ 'metadata.session_id': session_id });

      if (existingBooking) {
        return res.json(existingBooking); // Return existing booking if found
      }

      // Create new booking
      const newBooking = new Booking({
        room,
        customer,
        startDate,
        endDate,
        totalAmount, // Store totalAmount in database
        metadata: {
          session_id,
        },
      });

      const savedBooking = await newBooking.save();

      // Update room's bookings
      const bookedRoom = await Room.findById(room);
      bookedRoom.bookings.push({
        id:savedBooking.id,
        startDate,endDate});
      await bookedRoom.save();

      return res.json(savedBooking);
    } else {
      return res.status(400).send('Payment not confirmed');
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};



exports.getRoomBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ room: req.params.roomId });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getBookingsByCustomerId = async (req,res) => {
  try {
    const bookings = await Booking.find({ customer: req.params.customerId });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getBookingsByOwnerId = async (req, res) => {
  const ownerId = req.params.ownerId; // Extract ownerId from request parameters

  try {
    // Step 1: Find rooms belonging to the owner
    const rooms = await Room.find({ owner: ownerId });

    // Step 2: Fetch bookings for each room
    let allBookings = [];
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      const bookings = await Booking.find({ room: room._id });
      allBookings = allBookings.concat(bookings);
    }
    res.json(allBookings); // Return all bookings associated with rooms owned by ownerId
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
