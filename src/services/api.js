import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketnotes-backend-api-007w.onrender.com",
});