// src/api/axios.ts
import axios from "axios";
import { getToken } from "../utils/storage";

const API = axios.create({
  baseURL: "https://portfolia-awd7.onrender.com", // your FastAPI backend
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
