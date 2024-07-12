import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { deleteRoom } from '../services/api';

const RoomCard = ({ room, toDate, fromDate, ishome, isOwner,change,setChange }) => {
  const navigate = useNavigate();
  const { auth, role } = useContext(AuthContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleBookNowClick = () => {
    if (ishome) {
      navigate(role === 'owner' ? "/room/owner" : "/room/user");
    }
    if (fromDate && toDate) {
      const url = `/rooms/${room._id}?fromDate=${fromDate}&toDate=${toDate}`;
      navigate(url);
    } else {
      toast.error('Please fill in the dates.');
    }
  };

  const handleEditRoom = () => {
    const url = `/editroom/${room._id}`; // Adjust the route as per your application
    navigate(url);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDeleteRoom = async () => {
    try {
      await deleteRoom(room._id);
      setChange(!change);
      toast.success('Room deleted successfully');
      // Optionally, you can trigger a refresh of rooms or update state
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error('Failed to delete room');
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-xl gap-5 bg-white hover:shadow-3xl p-4 cursor-pointer">
      <img className="w-full h-48 object-cover" src={room.photos[0]} alt={room.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{room.name}</div>
        <p className="text-gray-700 text-base">
          Address : {room.address} 
        </p>
        <p className="text-gray-700 text-base">
          Floor Size: {room.floorSize} sq. ft.
        </p>
        <p className="text-gray-700 text-base">
          Beds: {room.numberOfBeds}
        </p>
        <p className="text-gray-700 text-base">
          Amenities: {room.amenities.join(', ')}
        </p>
        <p className="text-gray-700 text-base">
          Rent: ${room.rentPerDay} per day
        </p>
        
      </div>
      {!isOwner ? (
        <>
          {auth ? (
            <Button
              fullWidth
              variant="contained"
              className="mt-4 cursor-pointer"
              sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
              onClick={handleBookNowClick}
            >
              Book Now
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              className="mt-4 cursor-pointer"
              sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
              onClick={() => navigate('/login')}
            >
              Login Now
            </Button>
          )}
        </>
      ) : (
        <div className='flex flex-row justify-between items-center gap-6'>
          <Button
            fullWidth
            variant="contained"
            className="mt-4 cursor-pointer"
            sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
            onClick={handleEditRoom}
          >
            Edit
          </Button>
          <Button
            fullWidth
            variant="contained"
            className="mt-4 cursor-pointer"
            sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
            onClick={handleOpenDeleteDialog}
          >
            Delete
          </Button>
          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
            <DialogContent>
              <p id="alert-dialog-description">
                Are you sure you want to delete this room?
              </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDeleteRoom} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default RoomCard;
