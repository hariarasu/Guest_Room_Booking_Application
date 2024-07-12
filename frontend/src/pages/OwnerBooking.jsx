import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getBookingsByOwnerId, getRoomById } from '../services/api';

const OwnerBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByOwnerId(id);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [id]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomDetailsPromises = bookings.map((booking) =>
          getRoomById(booking.room)
        );
        const roomDetailsResponses = await Promise.all(roomDetailsPromises);
        const roomsData = roomDetailsResponses.reduce((acc, response) => {
          acc[response.data._id] = response.data;
          return acc;
        }, {});
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    if (bookings.length > 0) {
      fetchRoomDetails();
    }
  }, [bookings]);

  return (
    <div className="p-4">
      <div>
        <h5 className='text-center font-bold text-3xl mb-5'>Bookings</h5>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Room</TableCell>
              <TableCell style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Address</TableCell>
              <TableCell style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Floor Size (sq. ft.)</TableCell>
              <TableCell style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Beds</TableCell>
              <TableCell style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Amenities</TableCell>
              <TableCell style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Rent (per day)</TableCell>
              <TableCell style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Start Date</TableCell>
              <TableCell style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>End Date</TableCell>
              <TableCell style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => {
              const room = rooms[booking.room] || {};
              return (
                <TableRow key={booking._id}>
                  <TableCell style={{ textAlign: 'center' }}>{room.name || 'Loading...'}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{room.address || 'Loading...'}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{room.floorSize || 'Loading...'}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{room.numberOfBeds || 'Loading...'}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{room.amenities ? room.amenities.join(', ') : 'Loading...'}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{room.rentPerDay ? `$${room.rentPerDay}` : 'Loading...'}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{booking.startDate}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{booking.endDate}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{booking.totalAmount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OwnerBooking;
