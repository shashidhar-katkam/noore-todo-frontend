import axios from "axios";
import { url } from "@/app/utils/constants";

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
