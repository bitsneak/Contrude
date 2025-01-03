import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.contrude.eu',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;