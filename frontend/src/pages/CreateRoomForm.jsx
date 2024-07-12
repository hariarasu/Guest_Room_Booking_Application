import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { createRoom } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreateRoomForm = () => {
  const [roomData, setRoomData] = useState({
    name: '',
    floorSize: '',
    numberOfBeds: '',
    amenities: [],
    minBookingDays: '',
    maxBookingDays: '',
    rentPerDay: '',
    photos: [],
    address: '' // Add address field here
  });
  const navigate = useNavigate();

  const [amenitiesField, setAmenitiesField] = useState('');
  const [photosField, setPhotosField] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleAmenitiesChange = (e) => {
    setAmenitiesField(e.target.value);
    const amenities = e.target.value.split(',').map(item => item.trim());
    setRoomData({ ...roomData, amenities });
  };

  const handlePhotosChange = (e) => {
    setPhotosField(e.target.value);
    const photos = e.target.value.split(',').map(url => url.trim());
    setRoomData({ ...roomData, photos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRoom(roomData);
      toast.success('Room created successfully!');
      setRoomData({
        name: '',
        floorSize: '',
        numberOfBeds: '',
        amenities: [],
        minBookingDays: '',
        maxBookingDays: '',
        rentPerDay: '',
        photos: [],
        address: '' // Reset address field
      });
      setAmenitiesField('');
      setPhotosField('');
      navigate('/room/owner')
    } catch (error) {
      console.error('Failed to create room:', error);
      toast.error('Failed to create room. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Create a Room
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          name="name"
          value={roomData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Address" 
          variant="outlined"
          name="address"
          value={roomData.address}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Floor Size"
          variant="outlined"
          name="floorSize"
          value={roomData.floorSize}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Number of Beds"
          variant="outlined"
          type="number"
          name="numberOfBeds"
          value={roomData.numberOfBeds}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Minimum Booking Days"
          variant="outlined"
          type="number"
          name="minBookingDays"
          value={roomData.minBookingDays}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Maximum Booking Days"
          variant="outlined"
          type="number"
          name="maxBookingDays"
          value={roomData.maxBookingDays}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Rent per Day"
          variant="outlined"
          type="number"
          name="rentPerDay"
          value={roomData.rentPerDay}
          onChange={handleChange}
          required
        />
        
        <TextField
          fullWidth
          label="Amenities (Separated by commas)"
          variant="outlined"
          value={amenitiesField}
          onChange={handleAmenitiesChange}
          helperText="Enter amenities separated by commas"
        />
        <TextField
          fullWidth
          label="Photos URLs (Separated by commas)"
          variant="outlined"
          value={photosField}
          onChange={handlePhotosChange}
          helperText="Enter photo URLs separated by commas"
        />
        <Button
          type="submit"
          variant="contained"
          className="mt-4 cursor-pointer"
          sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
        >
          Create Room
        </Button>
      </form>
    </div>
  );
};

export default CreateRoomForm;
