import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export const api = axios.create({
  baseURL: process.env.API_BASE_URL
})