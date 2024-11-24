import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://roomzee.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;