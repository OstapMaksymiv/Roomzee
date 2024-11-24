import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://roomzee.onrender.com/api",
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export default apiRequest;