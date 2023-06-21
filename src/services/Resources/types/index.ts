export type ResourceType = {
    id: string,
    name: string
}

export type ResourceManufacturer = {
    id: string,
    name: string
}

export type ResourceConfiguration = {
    component: string,
    description: string
}

export type Resource = {
    id: string,
    active: boolean,
    description: string,
    type: ResourceType,
    manufacturer: ResourceManufacturer,
    configurations: ResourceConfiguration[]
} 