import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.localhost',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;