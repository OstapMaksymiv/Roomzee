import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://roomzee.onrender.com",
  withCredentials: true,
});

export default apiRequest;