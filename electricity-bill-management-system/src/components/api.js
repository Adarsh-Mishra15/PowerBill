import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Your backend URL
  withCredentials: true, // Important to send cookies
});

export default api;
