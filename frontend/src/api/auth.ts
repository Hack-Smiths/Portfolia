// src/api/auth.ts
import axios from "axios";

const API_URL = "https://portfolia-awd7.onrender.com"; // replace with actual

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
