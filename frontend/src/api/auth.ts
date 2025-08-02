// src/api/auth.ts
import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // replace with actual

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
