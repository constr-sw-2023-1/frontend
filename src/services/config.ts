import axios from "axios";
import env from "./env";

const { APPLICATION_IP, PORT, PROTOCOL } = env

const config = axios.create({
    baseURL: `${PROTOCOL}://${APPLICATION_IP}:${PORT}`,
    headers: {
        "Content-type": "application/json"
    }
});

export default config