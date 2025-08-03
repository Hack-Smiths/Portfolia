// src/api/axios.ts
import axios from "axios";
import { getToken } from "../utils/storage";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // your FastAPI backend
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
