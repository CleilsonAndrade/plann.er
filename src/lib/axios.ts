import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config();

export const api = axios.create({
  baseURL: "http://localhost:3333"
})