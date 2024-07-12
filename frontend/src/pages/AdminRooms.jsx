import React, { useState, useEffect, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { getAllRooms, deleteRoom } from '../services/api';

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [open, setOpen] = useState(false);
    const [roomIdToDelete, setRoomIdToDelete] = useState(null);
    const navigate = useNavigate();
    const { auth, role } = useContext(AuthContext);

    useEffect(() => {
        if (auth && role === 'admin') {
            fetchRooms();
        }
    }, [auth, role]);

    const fetchRooms = async () => {
        try {
            const response = await getAllRooms();
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const handleDeleteClick = (roomId) => {
        setRoomIdToDelete(roomId);
        setOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteRoom(roomIdToDelete);
            toast.success('Room deleted successfully');
            fetchRooms();
        } catch (error) {
            console.error('Error deleting room:', error);
            toast.error('Failed to delete room');
        } finally {
            setOpen(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClick = (roomId) => {
        navigate(`/editroom/${roomId}`);
    };

    if (!auth || role !== 'admin') {
        return <p>You must be an admin to view this page.</p>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Admin Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                    <div key={room._id} className="max-w-sm rounded overflow-hidden shadow-xl bg-white p-4">
                        <img className="w-full h-48 object-cover" src={room.photos[0]} alt={room.name} />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{room.name}</div>
                            <p className="text-gray-700 text-base">Address : {room.address}</p>
                            <p className="text-gray-700 text-base">Floor Size: {room.floorSize} sq. ft.</p>
                            <p className="text-gray-700 text-base">Beds: {room.numberOfBeds}</p>
                            <p className="text-gray-700 text-base">Amenities: {room.amenities.join(', ')}</p>
                            <p className="text-gray-700 text-base">Rent: ₹ {room.rentPerDay} per day</p>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button fullWidth
                                variant="contained"
                                className="mt-4"
                                sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
                                onClick={() => handleEditClick(room._id)}>
                                Edit
                            </Button>
                            <Button fullWidth
                                variant="contained"
                                className="mt-4"
                                sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
                                onClick={() => handleDeleteClick(room._id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this room? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </div>
    );
};

export default AdminRooms;
