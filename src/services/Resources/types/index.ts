export type ResourceType = {
    id: string,
    name?: string
}

export type ResourceManufacturer = {
    id: string,
    name?: string
}

export type ResourceConfiguration = {
    component: string,
    description: string
}

export type Resource = {
    id: string,
    description: string,
    type: ResourceType,
    manufacturer: ResourceManufacturer,
    configurations: ResourceConfiguration[]
} 

export class CreateResource {
    id?: string
    description?: string
    manufactorUUID?: string
    typeUUID?: string
    configurations?: ResourceConfiguration[]

    toResource():Resource {
        return {
            id: this.id!,
            description: this.description!,
            manufacturer: {
                id: this.manufactorUUID!,
            },
            type: {
                id: this.typeUUID!
            },
            configurations: this.configurations!
        }
    }
}