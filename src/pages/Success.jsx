import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../utils/inanime.json';
import { HiBadgeCheck } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';

const SuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleTrackingScreen = () => {
    navigate('/tracking');
  };

  const handleLogout = () => {
    navigate('/onboard');
    dispatch(removeUser(user));

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-poppins">
      <div className="w-64 h-64 relative">
        <div className='left-[6.5rem] top-[10rem] text-[3rem] absolute z-50 text-[#FE8C00]'><HiBadgeCheck /></div>
        <Lottie options={defaultOptions} />
      </div>
      <h1 className="text-2xl font-bold mt-6">Login Successful</h1>
      <button 
        className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600"
        onClick={handleTrackingScreen}
      >
        Go to Tracking Screen
      </button>
      <button 
        className="mt-3 bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default SuccessPage;
