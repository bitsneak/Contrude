import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/AxiosInstance';

const UserProfile = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    {onClose}
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await fetch('https://api.contrude.eu/auth/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });

    if(response.ok === true){
      navigate('/');
    }else{
      console.log('Not able to logout')
    }
  
    } catch (error) {
      console.log('Error', error);
    }

  }
  
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-1/4 h-3/5">
        <div className="flex h-10 justify-between items-center">
          <p className="font-bold text-xl">Profile</p>
          <button
          className="flex h-10 w-10 border-2 border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-red-900 items-center justify-center"
          onClick={onClose}
        >
          X
        </button>
        </div>

        <button
          className="mt-4 w-full border-2 border-black py-2 px-4 rounded hover: bg-gray-300 hover:font-bold transform hover:scale-105 transition-all duration-200"
          onClick={handleLogOut}
        >
          LogOut
        </button>
        
      </div>
    </div>,
    document.body
  );
};

export default UserProfile;
