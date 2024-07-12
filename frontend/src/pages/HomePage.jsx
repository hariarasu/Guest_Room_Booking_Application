import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hotel } from '../Assest/assest';
import { getAllRooms } from '../services/api';
import RoomCard from '../components/RoomCard';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const { auth, role } = useContext(AuthContext);


  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    };

    fetchRooms();
  }, []);
  return (
    <>
      <div className=" min-h-full bg-cover bg-center" style={{ backgroundImage: `url(${Hotel})` }}>
        <div className="flex flex-col items-center justify-center  bg-black bg-opacity-50 text-white h-full gap-10 ">
          <div className='flex flex-col items-center justify-center m-52'>
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Guest House Booking</h1>
            <p className="text-lg mb-8 text-center max-w-prose">Explore our comfortable rooms and book your stay with ease.</p>
            {role === 'user' ? <>{
              auth ?
                <Link to="/room/user" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full uppercase tracking-wide text-lg shadow-lg transition duration-300">
                  Book Now
                </Link> :
                <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full uppercase tracking-wide text-lg shadow-lg transition duration-300">
                  Login Now
                </Link>}</> : (<>
                  <Link to="/room/owner" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full uppercase tracking-wide text-lg shadow-lg transition duration-300">
                  Add room
                </Link>
                </>)}
          </div>
        </div>
      </div>
      {role === 'user' &&
        <div className="flex flex-col justify-center items-center mt-5">
          <div>
            <h1 className='text-4xl font-bold'>Available Rooms</h1>
          </div>
          <div className="grid grid-cols-4 p-10 px-24">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} ishome={true} />
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default HomePage;
