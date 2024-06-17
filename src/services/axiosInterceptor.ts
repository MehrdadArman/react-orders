import { toast } from "react-toastify";
import axios from "axios";

export const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  (config: any) => {
    config.headers = {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "content-Type": "application/json",
    };
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async function (error: any) {
    const originalRequest = error.config;

    // No Response(netError)
    if (error.response === undefined && originalRequest._retry === true) {
      toast.error("Server error Please try again later");
      return;
    } else if (error.response === undefined && !originalRequest._retry) {
      originalRequest._retry = true;
      toast.warning("Error trying to re-try server");
      return axiosApiInstance(originalRequest);
    }
    // 401 --> (Refresh_token)
    else if (error.response.status === 401 && !originalRequest._retry) {
      toast.error("Unauthorized !!");
      localStorage.clear();

      // return redirect(authRoutes.LOGIN_BY_USER_NAME);
    } else if (error.response.status === 500 && originalRequest._retry) {
      toast.error("Internal server error Please try again later.");
    } else if (error.response.status === 500 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosApiInstance(originalRequest);

      // 404
    } else if (error.response.status === 404) {
      toast.error("Server not found");

      // >500
    } else if (error.response.status > 500 && originalRequest._retry) {
      toast.error("Server error Please try again later");
    } else if (error.response.status > 500 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosApiInstance(originalRequest);

      // 400
    } else if (error.response.status === 400) {
      toast.error("Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default axiosApiInstance;
