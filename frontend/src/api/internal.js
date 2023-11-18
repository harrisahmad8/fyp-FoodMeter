import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const baseURL='http://localhost:5000'
export const login = async (data) => {
  let response;

  try {
    response = await api.post(`${baseURL}/login`, data);
  } catch (error) {
    return error;
  }

  return response;
};

export const signup = async (data) => {
  let response;

  try {
    response = await api.post(`${baseURL}/register`, data);
  } catch (error) {
    return error;
  }

  return response;
};
