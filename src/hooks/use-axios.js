import axios from "axios";
import {API_URL} from "../constants/index";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const useAxios = () => {
  const callApi = async (method, url, data, headers = {}) => {
    const requestConfig = {
      method,
      url,
      data,
      headers,
    };

    try {
      const { data } = await axiosInstance.request(requestConfig);
      return data || true;
    } catch (error) {
      console.log(error);
    }
  };

  const get = async (url) => {
    return await callApi('GET', url);
  };


  return {
    get,
  };
};

export { useAxios };