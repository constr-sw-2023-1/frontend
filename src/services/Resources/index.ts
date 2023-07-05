import api from "@utils/api";
import { AxiosInstance } from "axios"
import { CreateResource, Resource, ResourceManufacturer, ResourceType } from "./types";
export * from "./types"

export default class ResourceService {
  public api: AxiosInstance;

  constructor() {
    this.api = api({ baseURL: "//localhost:8084/resources" })
  }
  async loadResources() {
    return await this.api.get<Resource[]>("")
  }

  async getById(id: string) {
    return await this.api.get<Resource>("/" + id)
  }

  async updateResource(resource:Resource) {
    return await this.api.put("/" + resource.id, {...resource, id: undefined})
  }

  async deleteResource(resourceId: string) {
    return await this.api.delete(`/${resourceId}`)
  }

  async loadTypes() {
    return await this.api.get<ResourceType[]>("/types")
  }

  async loadManufacturers() {
    return await this.api.get<ResourceManufacturer[]>("/manufacturers")
  }

  async saveManufactures(manufacture: ResourceManufacturer) {
    return await this.api.post("/manufacturers", manufacture)
  }

  async saveType(type: ResourceType) {
    return await this.api.post("/types", type)
  }

  async saveNewResource(resource: CreateResource) {
    return await this.api.post("", resource)
  }
}