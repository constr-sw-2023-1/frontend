import api from "@utils/api";
import { AxiosInstance } from "axios"
import { Resource } from "./types";
export * from "./types"

export default class ResourceService {
    public api: AxiosInstance;

    constructor() {
        this.api = api({ baseURL: "//168.75.107.143:8084" })
    }
    async loadResources() {
        return await this.api.get("/resources")
    }
}