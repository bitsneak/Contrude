import React, { useState } from 'react';
import LoginField from '../components/LoginField';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiArrowNarrowRight } from "react-icons/hi";


// This is the Login Page that displays whenever the site is pulled up
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setError(null); // Reset any previous errors
    console.log("Sended irgendwas");

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error('Login failed');
      }

      const data = await response.json();
      if (data === false) {
        setError('Invalid username or password');
        return;
      }
      
      console.log('Login successful:', data);
      window.location.href = '/zwischen';
    
    } catch (error) {
      setError(error.message); // Display error message to user
    }
  };
    skipButton => () =>
    {
      localStorage.setItem('token', 'Hallo')
    }

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
    >
      <div className="bg-white p-6 rounded-lg max-w-md w-full border-2">
        <img className="mb-2" src="/src/img/Logo.jpg" alt="Logo" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <LoginField
            placeholder="User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <LoginField
            placeholder="PW"
            isPassword={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className=" bg-gray-400 text-white text-2xl py-2 hover:bg-gray-700 rounded-full w-16 h-16 flex justify-center items-center hover:font-bold transform hover:scale-105 transition-all duration-200">
              <HiArrowNarrowRight />
            </button>
          </div>
          
        </form>

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
        
        <button className='skipButton'>Skip</button>
      </div>
    </div>
  );
};

export default LoginPage;
