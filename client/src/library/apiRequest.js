import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://roomzee-1.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;