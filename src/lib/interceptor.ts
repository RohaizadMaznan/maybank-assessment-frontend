import axios from "axios";

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL!;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
