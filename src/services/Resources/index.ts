import api from "@utils/api";
import { AxiosInstance } from "axios"
import { Resource } from "./types";
export * from "./types"

const baseResources: Resource[] = [
    {
        "id": "c65242d7-9e6b-4d2f-93f4-452b9a8f27a1",
        "description": "Computador de mesa",
        active: true,
        "type": {
            "id": "1a854a75-3208-4d8e-8fe3-2f61a347b9df",
            "name": "Desktop"
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
        "id": "f5c4a81b-b919-45a6-b6de-6dc995bea4b8",
        "description": "Notebook ultrabook",
        active: true,
        "type": {
            "id": "2a1592d4-9f8a-4b55-bc57-5637247b7c76",
            "name": "Ultrabook"
        },
        "manufacturer": {
            "id": "9a1a7312-65c2-4a5d-9c27-bb71ef86530c",
            "name": "Dell"
        },
        "configurations": [
            {
                "component": "Processador Intel Core i5",
                "description": "2,5 GHz, 4 núcleos"
            },
            {
                "component": "Memória RAM",
                "description": "8 GB DDR4"
            },
            {
                "component": "Armazenamento",
                "description": "SSD 256 GB"
            }
        ]
    },
    {
        "id": "79227f12-0a57-46fe-bc4e-7e3f18de0e0f",
        "description": "Projetor de alta resolução",
        active: true,
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
    },
    {
        "id": "21c68db2-3a34-47d9-babb-b3c22696f4b9",
        "description": "Impressora multifuncional",
        active: true,
        "type": {
            "id": "7fc6505c-3e01-404a-9e0e-1d91c50be0d2",
            "name": "Impressora"
        },
        "manufacturer": {
            "id": "1d9a0c54-d1fd-4f36-b2ef-0bc9f68e7a45",
            "name": "Canon"
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
    }
]

export default class ResourceService {
    public api: AxiosInstance;

    constructor() {
        this.api = api({ baseURL: "//localhost:8084" })
    }
    async loadResources() {
        return [...baseResources]//await this.api.get("/resources")
    }
}