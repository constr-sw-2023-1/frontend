import axios from "axios";

const api = ({ baseURL }: { baseURL: string }) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: "Bearer root",
      "Content-Type": "application/json",
    },
  });

export default api;
