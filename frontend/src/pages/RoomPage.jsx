import React, { useEffect, useState } from 'react';
import { getAllRooms } from '../services/api';
import RoomCard from '../components/RoomCard';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const RoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await getAllRooms();
      setRooms(data);
      setFilteredRooms(data); // Initialize filtered rooms with all rooms
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };

  const handleDateChange = (dates) => {
    if (dates) {
      const formattedFromDate = dates[0] ? dates[0].format('DD-MM-YYYY') : null;
      const formattedToDate = dates[1] ? dates[1].format('DD-MM-YYYY') : null;

      setFromDate(formattedFromDate);
      setToDate(formattedToDate);

      const tempRooms = rooms.filter((room) => {
        let availability = true;
        if (room.bookings.length > 0) {
          for (const booking of room.bookings) {
            console.log(booking.startDate);
            const bookingFrom = moment(booking.startDate, 'DD-MM-YYYY');
            const bookingTo = moment(booking.endDate, 'DD-MM-YYYY');
            const selectedFrom = moment(dates[0].format('DD-MM-YYYY'), 'DD-MM-YYYY');
            const selectedTo = moment(dates[1].format('DD-MM-YYYY'), 'DD-MM-YYYY');

            if (
              selectedFrom.isSameOrBefore(bookingTo) &&
              selectedTo.isSameOrAfter(bookingFrom)
            ) {
              availability = false;
              break;
            }
          }
        }
        return availability;
      });

      setFilteredRooms(tempRooms);
    } else {
      setFromDate(null);
      setToDate(null);
      setFilteredRooms(rooms); // Reset to all rooms when dates are cleared
    }
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <div>
        <h1 className="text-4xl font-bold">Available Rooms</h1>
      </div>
      <div className="my-5">
        <RangePicker
          format="DD-MM-YYYY"
          onChange={handleDateChange}
          disabledDate={disabledDate}
          size="large" 
          value={fromDate && toDate ? [moment(fromDate, 'DD-MM-YYYY'), moment(toDate, 'DD-MM-YYYY')] : []}
          style={{ width: '100%' }} 
        />
      </div>
      <div className="grid grid-cols-4 p-10 px-24 gap-4">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} fromDate={fromDate} toDate={toDate} />
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
