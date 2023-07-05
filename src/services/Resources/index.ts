import api from "@utils/api";
import { AxiosInstance } from "axios"
import { CreateResource, Resource, ResourceManufacturer, ResourceType } from "./types";
export * from "./types"

let baseTypes: ResourceType[] = [
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa3",
    "name": "Notebooks"
  },
  {
    "id": "7fc6505c-3e01-404a-9e0e-1d91c50be0d2",
    "name": "Impressora"
  },
  {
    "id": "a01be067-09e3-41b3-a503-6a3bc7e64bc0",
    "name": "Projetor"
  }
]

let baseManufactures: ResourceManufacturer[] = [
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa2",
    "name": "Dell"
  },
  {
    "id": "d56f8d79-eb56-4e19-9f9c-4c15c927a7b0",
    "name": "HP"
  },
  {
    "id": "8fc8fb46-925d-4b75-b636-2b2f25a20c7d",
    "name": "Epson"
  }
]

let baseResources: Resource[] = [
    {
      "id": "85816a26-4d57-4ce7-9e88-caaf18e4da77",
      "description": "Inspiron 7000",
      "type": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa3",
        "name": "Notebooks"
      },
      "manufacturer": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa2",
        "name": "Dell"
      },
      "configurations": [
        {
          "component": "Placa de Vídeo",
          "description": "GTX 1050"
        },
        {
          "component": "Processador",
          "description": "Intel I7-7700K"
        }
      ]
    },
    {
      "id": "b04b2a8e-8f95-49de-8884-305bf1022a6e",
      "description": "NoteBook Ultrabook",
      "type": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa3",
        "name": "Notebooks"
      },
      "manufacturer": {
        "id": "d56f8d79-eb56-4e19-9f9c-4c15c927a7b0",
        "name": "HP"
      },
      "configurations": [
        {
          "component": "Processador Intel Core i7",
          "description": "4,0 GHz, 8 núcleos"
        },
        {
          "component": "Memória RAM",
          "description": "16 GB DDR4"
        },
        {
          "component": "Armazenamento",
          "description": "SSD 500 GB"
        }
      ]
    },
    {
      "id": "df3af467-a91f-41e5-b475-8f952261cade",
      "description": "Impressora multifuncional",
      "type": {
        "id": "7fc6505c-3e01-404a-9e0e-1d91c50be0d2",
        "name": "Impressora"
      },
      "manufacturer": {
        "id": "d56f8d79-eb56-4e19-9f9c-4c15c927a7b0",
        "name": "HP"
      },
      "configurations": [
        {
          "component": "Resolução de impressão",
          "description": "1200x1200 dpi"
        },
        {
          "component": "Funções",
          "description": "Impressão, cópia, digitalização"
        },
        {
          "component": "Conectividade",
          "description": "USB, Wi-Fi"
        }
      ]
    },
    {
      "id": "81025c3a-555b-441f-81a1-7c61bedd418a",
      "description": "Projetor de alta resolução",
      "type": {
        "id": "a01be067-09e3-41b3-a503-6a3bc7e64bc0",
        "name": "Projetor"
      },
      "manufacturer": {
        "id": "8fc8fb46-925d-4b75-b636-2b2f25a20c7d",
        "name": "Epson"
      },
      "configurations": [
        {
          "component": "Resolução",
          "description": "1920x1080 pixels"
        },
        {
          "component": "Brilho",
          "description": "4000 lumens"
        },
        {
          "component": "Conexões",
          "description": "HDMI, VGA"
        }
      ]
    }
  ]

export default class ResourceService {
    public api: AxiosInstance;

    constructor() {
        this.api = api({ baseURL: "//localhost:8084" })
    }
    async loadResources() {
        return {data: [...baseResources]}//await this.api.get("/resources")
    }

    async loadTypes() {
      return {data: [...baseTypes]}//await this.api.get("/resources/types")
    }

    async loadManufacturers() {
      return {data: [...baseManufactures]}//await this.api.get("/resources/manufacturers")
    }

    async saveManufactures(manufacture: ResourceManufacturer) {
      //return await this.api.post("/resources/manufacturers", manufacture)
      baseManufactures = [...baseManufactures, manufacture]
      return Promise.resolve(manufacture)
    }

    async saveType(type: ResourceType) {
      //return await this.api.post("/resources/types", manufacture)
      baseTypes = [...baseTypes, type]
      return Promise.resolve(type)
    }

    async saveNewResource(resource: CreateResource) {
      //return await this.api.post("/resources", resource)
      baseResources = [...baseResources, resource.toResource()]
    }
}