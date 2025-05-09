import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true, // important for cookie/session handling
});

export default api;
