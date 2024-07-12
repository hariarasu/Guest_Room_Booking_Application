import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getRoomById, createBooking } from '../services/api';
import { Button } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import moment from 'moment';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const RoomDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const fromDate = searchParams.get('fromDate');
  const toDate = searchParams.get('toDate');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await getRoomById(id);
        setRoom(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : 'Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handlePayNow = async () => {
    try {
      const totalDays = moment(toDate, 'DD-MM-YYYY').diff(moment(fromDate, 'DD-MM-YYYY'), 'days') + 1;
      const totalAmount = room.rentPerDay * totalDays * 100; 

      // Create booking
      const response = await createBooking({
        room: room._id,
        startDate: fromDate,
        endDate: toDate,
        totalAmount,
      });

      const { id } = response.data;
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: id });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      console.error('Payment failed:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!room) {
    return <p>Room not found</p>;
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="max-w-lg rounded overflow-hidden shadow-lg bg-white flex flex-col justify-center items-center p-6 space-y-4">
        <img className="w-full h-48 object-cover rounded-lg" src={room.photos[0]} alt={room.name} />
        <div className="w-full">
          <h3 className="font-bold text-xl mb-2">{room.name}</h3>
          <div className='grid grid-cols-2 gap-2'>
          <p className="text-gray-700 text-base">
          Address : {room.address} 
        </p>
            <p className="text-gray-700 text-base">Floor Size: {room.floorSize} sq. ft.</p>
            <p className="text-gray-700 text-base">Beds: {room.numberOfBeds}</p>
            <p className="text-gray-700 text-base">Amenities: {room.amenities.join(', ')}</p>
            <p className="text-gray-700 text-base">Rent: ₹{room.rentPerDay} per day</p>
          </div>
        </div>
        <div className="w-full">
          <h3 className="font-bold text-lg mb-2">Room Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {room.photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Room ${index}`} className="w-full h-auto rounded-lg shadow-md" />
            ))}
          </div>
        </div>
        <div className="w-full">
          <h3 className="font-bold text-lg mb-2">Booking Details</h3>
          <p className="text-gray-700 text-base">From Date: {fromDate}</p>
          <p className="text-gray-700 text-base">To Date: {toDate}</p>
        </div>
        <Button
          fullWidth
          variant="contained"
          className="mt-4"
          sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
          onClick={handlePayNow}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default RoomDetails;
