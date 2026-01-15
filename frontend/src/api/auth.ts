// src/api/auth.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL; // replace with actual

export const signup = async (username: string, email: string, password: string) => {
  return axios.post(`${API_URL}/signup`, {
    username,
    email,
    password,
  });
};

export const login = async (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};
