// Create an Axios instance with a default base URL
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/', // Replace with your server's URL
});

export default instance;
