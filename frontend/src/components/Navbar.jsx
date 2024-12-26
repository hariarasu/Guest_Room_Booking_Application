import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, setAuth,role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setAuth(false); 
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-6">
      <div className="flex items-center text-white">
        <span className="font-semibold text-xl tracking-tight">G-Rooms</span>
      </div>
      <div className="block lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/home" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 cursor-pointer">
            Home
          </Link>
          <Link to={role === 'owner' ? "/room/owner" : role === 'user'? "/room/user":'/room/admin'} className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 cursor-pointer">
            Rooms
          </Link>
          
          {!auth && (
            <>
              <Link to="/register" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 cursor-pointer">
                Register
              </Link>
              <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white">
                Login
              </Link>
            </>
          )}
          {auth && (
            <>
            <Link to={role === 'owner' ? "/bookings/owner" :role==='user'? "/bookings/user":"bookings/admin"} className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 cursor-pointer">
            Booking
          </Link>
            <button
              onClick={handleLogout}
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white cursor-pointer "
            >
              Logout
            </button>
            </>
          )}
        </div>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
