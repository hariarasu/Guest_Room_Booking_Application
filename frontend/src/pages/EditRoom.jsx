import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { getRoomById, updateRoom } from '../services/api';

const EditRoom = () => {
  const { roomId } = useParams(); // Get roomId from URL params
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [room, setRoom] = useState({
    name: '',
    floorSize: '',
    numberOfBeds: '',
    amenities: '',
    minBookingDays: '',
    maxBookingDays: '',
    rentPerDay: '',
    photos: [],
    address: '' // Add address field here
  });

  useEffect(() => {
    // Fetch room details when component mounts
    const fetchRoomDetails = async () => {
      try {
        const response = await getRoomById(roomId);
        setRoom(response.data); // Set room state with fetched data
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedRoom = await updateRoom(roomId, room); // Update room details using API function
      toast.success('Room updated successfully');
      navigate('/room/owner'); // Redirect to room list or room details page after update
    } catch (error) {
      console.error('Error updating room:', error);
      toast.error('Failed to update room');
    }
  };

  if (!auth) {
    return <p>You must be logged in to edit rooms.</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Edit Room</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5 justify-center items-center'>
          <TextField
            name="name"
            label="Room Name"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={room.name}
            onChange={handleChange}
          />
          <TextField
            multiline
            rows={4}
            name="address" 
            label="Address"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={room.address}
            onChange={handleChange}
          />
          <TextField
            name="floorSize"
            label="Floor Size (sq. ft.)"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={room.floorSize}
            onChange={handleChange}
          />
          <TextField
            name="numberOfBeds"
            label="Number of Beds"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={room.numberOfBeds}
            onChange={handleChange}
          />
          <TextField
            name="amenities"
            label="Amenities (comma separated)"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={room.amenities}
            onChange={handleChange}
          />
          <TextField
            name="minBookingDays"
            label="Minimum Booking Days"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={room.minBookingDays}
            onChange={handleChange}
          />
          <TextField
            name="maxBookingDays"
            label="Maximum Booking Days"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={room.maxBookingDays}
            onChange={handleChange}
          />
          <TextField
            name="rentPerDay"
            label="Rent Per Day"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={room.rentPerDay}
            onChange={handleChange}
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
          >
            Update Room
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;
