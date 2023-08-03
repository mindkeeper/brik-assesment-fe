import axiosInstance from "./axios";

export const loginRequest = (data) => {
  return axiosInstance.post("auth/login", data);
};
