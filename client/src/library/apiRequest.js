import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://roomzee-api.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;