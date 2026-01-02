import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER as string;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
