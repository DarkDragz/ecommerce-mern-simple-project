import axios from "axios";

import { STATUS_NETWORK_ERROR, StatusCodes } from "../shared/constants";
import { Notification } from "../components/ui/Notification";
import { getStore } from "./store";
import { logoutSuccess } from "../store/slices/authSlice";
const apiService = () => {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (err) => {
      if (
        err.response &&
        err.response.status === StatusCodes.UNAUTHORIZED &&
        err.response.config.url !== "/user/log-in"
      ) {
        const store = getStore();

        store?.dispatch(logoutSuccess());
        // Notification({ message: "Token expired! Please Login again" });
      }

      if (err?.code === STATUS_NETWORK_ERROR) {
        Notification({ message: "Something went wrong" });
      }

      return Promise.reject(err);
    }
  );

  return instance;
};

export const baseService = apiService();

export default baseService;
