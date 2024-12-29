import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../api/AxiosInstance';
import LoginField from '../components/LoginField';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

// This is the Login Page that displays whenever the site is pulled up
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      // First Call to get ID of username
      const responseId = await axiosInstance.get(`/auth/user/${username}`);
      const id = responseId.data.user[0]?.id; // Zugriff auf die erste ID
      console.log("Extracted ID:", id);
  
      if (!id) {
        throw new Error('Invalid user ID received');
      }
  
      const body = {
        user: id,   
        password: password,
      };
  
      const responseLogin = await axiosInstance.post('/auth/login', body, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Data sent to /auth/login:", { id, password });
  
      // Navigate to main page on success
      navigate('/main');
  
    } catch (error) {
      console.log('Error', error);
      if (error.response) {
        setError(error.response.data?.message || 'Login failed. Please try again.');
      } else {
        setError('Network error or server is down.');
      }
    }
  };
  

  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full border-2">
        <img className="mb-2" src="/src/img/Logo.jpg" alt="Logo" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <LoginField placeholder="User" value={username} onChange={(e) => setUsername(e.target.value)} />
          <LoginField placeholder="PW" isPassword={true} value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="w-full flex justify-center">
            <button type="submit" className="bg-gray-400 text-white text-2xl py-2 hover:bg-gray-700 rounded-full w-16 h-16 flex justify-center items-center hover:font-bold transform hover:scale-105 transition-all duration-200">
              <HiArrowNarrowRight />
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
        <button className='skipButton' onClick={() => navigate('/main')}>Skip</button>
      </div>
    </div>
  );
};

export default LoginPage;
