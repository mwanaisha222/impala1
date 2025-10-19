// src/api.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

export const getArticles = async () => {
  const response = await axios.get(`${API_BASE_URL}articles/`);
  return response.data;
};

export const submitContact = async (contactData) => {
  const response = await axios.post(`${API_BASE_URL}contacts/`, contactData);
  return response.data;
};
