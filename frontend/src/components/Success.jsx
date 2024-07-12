import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmBooking } from '../services/api';
import { toast } from 'react-toastify';
import { Tick } from '../Assest/assest';
import { Button } from '@mui/material';

const Success = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();


  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await confirmBooking({ session_id: sessionId });
        toast.success('Booking confirmed successfully!');
      } catch (error) {
        toast.error('Failed to confirm booking. Please contact support.');
        console.error('Failed to confirm booking:', error);
      }
    };

    if (sessionId) {
      confirmPayment();
    }
  }, [sessionId]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg rounded overflow-hidden shadow-lg bg-white flex flex-col justify-center items-center p-6 space-y-4">
        <div className='flex flex-col justify-center items-center'>
        <div className='w-[50%] h-[50%]'>
          <img src={Tick} alt="" />
        </div>
        <h3 className="font-bold text-xl mb-2">Payment Success</h3>
        <p className="text-gray-700 text-base">Your booking has been confirmed. Thank you for your payment!</p>
        <Button fullWidth
            variant="contained"
            className="mt-4 cursor-pointer"
            sx={{background:"#1F2937","&.MuiButtonBase-root:hover": {
                background:"#1F2937"
              }}} onClick={()=>navigate('/room/user')}>More Booking</Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
