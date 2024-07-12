import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import { createBooking } from '../services/api';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const BookingForm = ({ roomId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking({ room: roomId, startDate, endDate });
      toast.success('Booking successful!');
    } catch (error) {
      console.error(error);
      toast.error('Booking failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Start Date</label>
        <DatePicker
          value={moment(startDate)}
          onChange={(date, dateString) => setStartDate(dateString)}
          required
        />
      </div>
      <div>
        <label>End Date</label>
        <DatePicker
          value={moment(endDate)}
          onChange={(date, dateString) => setEndDate(dateString)}
          required
        />
      </div>
      <Button type="primary" htmlType="submit">
        Book Now
      </Button>
    </form>
  );
};

export default BookingForm;
