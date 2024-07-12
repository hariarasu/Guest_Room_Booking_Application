const express = require('express');
const router = express.Router();
const { createRoom, getAllRooms,getRoomById,getRoomsByOwnerId,updateRoom,deleteRoom } = require('../controllers/roomController');
const auth = require('../middleware/authMiddleware');


router.post('/createroom', auth, createRoom);
router.get('/getroom', getAllRooms);
router.get('/:id', getRoomById);
router.get('/owner/:ownerId',getRoomsByOwnerId);
router.put('/update/:id', updateRoom);
router.delete('/delete/:id', deleteRoom);

module.exports = router;
