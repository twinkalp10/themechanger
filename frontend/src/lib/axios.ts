import axios from "axios";
import { getUserLocalStorage } from "../Utils/getUserLocalStorage";

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${getUserLocalStorage()?.TOKEN}`,
  }
});

export default instance;
