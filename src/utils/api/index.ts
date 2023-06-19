import axios from "axios";

const api = ({ baseURL }: { baseURL: string }) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("JWT_TOKEN"),
      "Content-Type": "application/json",
    },
  });

export default api;
