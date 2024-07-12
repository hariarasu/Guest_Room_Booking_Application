const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  const { name, floorSize, numberOfBeds, amenities, minBookingDays, maxBookingDays, rentPerDay, photos,address } = req.body;

  try {
    const newRoom = new Room({
      owner: req.user.id,
      name,
      address,
      floorSize,
      numberOfBeds,
      amenities,
      minBookingDays,
      maxBookingDays,
      rentPerDay,
      photos,
    });

    const room = await newRoom.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('owner', 'name email');
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('owner', 'name email');
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Room not found' });
    }
    res.status(500).send('Server error');
  }
};



exports.getRoomsByOwnerId = async (req, res) => {
  const ownerId = req.params.ownerId; 

  try {
    const rooms = await Room.find({ owner: ownerId });
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateRoom = async (req, res) => {
  const { name,address, floorSize, numberOfBeds, amenities, minBookingDays, maxBookingDays, rentPerDay, photos } = req.body;
  const roomId = req.params.id;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, {
      name,
      address,
      floorSize,
      numberOfBeds,
      amenities,
      minBookingDays,
      maxBookingDays,
      rentPerDay,
      photos,
    }, { new: true });

    if (!updatedRoom) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    res.json(updatedRoom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteRoom = async (req, res) => {
  const roomId = req.params.id;

  try {
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    res.json({ msg: 'Room deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
