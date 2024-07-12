import React, { useState, useEffect } from 'react';
import { getRoomsByOwnerId } from '../services/api';
import RoomCard from '../components/RoomCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const OwnerRooms = () => {
    const [rooms, setRooms] = useState([]);
    const ownerId = localStorage.getItem('id');
    const [change, setChange] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoomsByOwnerId();
    }, [ownerId, change]);

    const fetchRoomsByOwnerId = async () => {
        try {
            const response = await getRoomsByOwnerId(ownerId);
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms by ownerId:', error);
        }
    };

    return (
        <div className="flex flex-col  items-center mt-5">
            <div className='flex flex-row justify-between items-center w-[80%]'>
                <div>
                    <h1 className="text-4xl font-bold">Your Rooms</h1>
                </div>
                <div>
                <Button
              fullWidth
              variant="contained"
              className="mt-4 cursor-pointer"
              sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
              onClick={()=>navigate('/addroom')}
            >
              Add Room
            </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 p-10 px-24 gap-4">
                {rooms.map((room) => (
                    <RoomCard key={room._id} room={room} isOwner={true} change={change} setChange={setChange} />
                ))}
            </div>
        </div>
    );
};

export default OwnerRooms;
