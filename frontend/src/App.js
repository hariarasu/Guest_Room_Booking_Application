import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import BookingPage from './pages/BookingPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateRoomForm from './pages/CreateRoomForm';
import RoomDetails from './components/RoomDetails';
import Success from './components/Success';
import AuthProvider, { AuthContext } from './context/AuthContext';
import OwnerRooms from './pages/OwenerRooms';
import OwnerBooking from './pages/OwnerBooking';
import EditRoom from './pages/EditRoom';
import AdminRooms from './pages/AdminRooms';
import AdminBooking from './pages/AdminBooking';

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/room/user" element={<RoomPage />} />
        <Route path="/room/owner" element={<ProtectedOwnerRoute element={<OwnerRooms/>} />} />
        <Route path="/bookings/user" element={<BookingPage />} />
        <Route path="/bookings/owner" element={<ProtectedOwnerRoute element={<OwnerBooking/>} />} />
        <Route path="/addroom" element={<ProtectedOwnerRoute element={<CreateRoomForm />} />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/success" element={<Success />} />
        <Route path='/room/admin' element={<AdminRooms/>}/>
        <Route path='/bookings/admin' element={<AdminBooking/>} />
        <Route path="/editroom/:roomId" element={<ProtectedOwnerRoute element={<EditRoom/>} />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
};

const ProtectedOwnerRoute = ({ element }) => {
  const { role } = useContext(AuthContext);
  console.log(role);
  if (role === 'owner' || role === 'admin') {
    return element;
  }
  return <Navigate to="/home" replace />;
};

export default App;