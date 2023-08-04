import axios from "axios";
const HOST = process.env.REACT_APP_BACKEND_URL;
const axiosInstance = axios.create({ baseURL: `${HOST}/api` });

export const axiosBaseQuery =
  () =>
  async ({ url, method, accessToken, data, params, formData }) => {
    try {
      const response = await axiosInstance({
        url,
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": formData ? "multipart/form-data" : "application/json",
        },
        data,
        params,
      });
      return { data: response.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status,
          message: err.response?.data?.message || err.message,
        },
      };
    }
  };

export default axiosInstance;
