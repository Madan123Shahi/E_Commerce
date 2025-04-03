import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/users",
});

export const registerUser = (data) => API.post("/register", data);
export const verifyUser = (data) => API.post("/verify", data);
