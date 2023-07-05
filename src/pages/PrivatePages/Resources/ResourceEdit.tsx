import { v4 as uuidv4 } from "uuid"
import { Autocomplete, Box, Container, Divider, Grid, IconButton, TextField, Typography } from "@mui/material"
import OrangeButton from "./component/OrangeButton"
import { useNavigate, useParams } from "react-router-dom"
import ResourceService, { Resource, ResourceConfiguration } from "@services/Resources"
import { useCallback, useEffect, useState } from "react"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ComputerIcon from '@mui/icons-material/Computer';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

type UITypeManufacture = {
    id?: string
    name?: string
    new?: boolean
}

class UIEditResource {
    id?: string
    description?: string
    manufactor?: UITypeManufacture
    type?: UITypeManufacture
    configurations?: ResourceConfiguration[]

    constructor(resource: Resource) {
        this.id = resource.id
        this.description = resource.description
        this.manufactor = { ...resource.manufacturer, new: false }
        this.type = { ...resource.type, new: false }
        this.configurations = resource.configurations
    }

    toResource(): Resource {
        let resource = {
            id: this.id,
            description: this.description,
            type: { id: this.type!.id, name: this.type!.name },
            manufacturer: { id: this.manufactor!.id, name: this.manufactor!.name },
            configurations: this.configurations
        } as Resource
        return resource
    }
}


const resourceService = new ResourceService()

export default function ResourceEdit() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [loaded, setLoaded] = useState(false)
    const [resourceValid, setResourceValid] = useState(false);
    const [resource, setResource] = useState({} as UIEditResource)
    const [types, setTypes] = useState([] as UITypeManufacture[])
    const [manufactures, setManufactures] = useState([] as UITypeManufacture[])

    const loadResource = useCallback(() => {
        resourceService.getById(id!)
            .then((response) => {
                setResource(new UIEditResource(response.data))
                return resourceService.loadTypes()
            }).then(response => {
                setTypes(response.data.map(it => { return { ...it, new: false } }) as UITypeManufacture[])
                return resourceService.loadManufacturers()
            }).then(response => {
                setManufactures(response.data.map(it => { return { ...it, new: false } }) as UITypeManufacture[])
                setLoaded(true)
            })
    }, [])

    useEffect(() => {
        setResourceValid(isResourceValid(resource))
    }, [resource])

    useEffect(() => {
        console.log("Load resource");
        loadResource();
    }, [loadResource])

    const isResourceValid = (resource: UIEditResource): boolean => {
        return !!resource.description && !!resource.manufactor?.id && !!resource.type?.id && !!resource.configurations &&
            resource.configurations!.length > 0 && !!resource.configurations![0].component && !!resource.configurations![0].description
    }

    const setTypeOnResource = (typeName: string) => {
        let type = types.find(t => typeName == t.name) ?? { name: typeName, id: uuidv4(), new: true }
        setResource({ ...resource, type } as UIEditResource)
    }

    const setManufactureOnResource = (manufactorName: string) => {
        let manufactor = manufactures.find(t => manufactorName == t.name) ?? { name: manufactorName, id: uuidv4(), new: true }
        setResource({ ...resource, manufactor } as UIEditResource)
    }


    const changeConfiguration = (idx: number, { description, component }: any) => {
        let configurations = resource.configurations!
        configurations[idx] = { description, component }
        setResource({ ...resource, configurations } as UIEditResource)
    }

    const addConfig = () => {
        let configuration = { description: '', component: '' }
        setResource({ ...resource, configurations: [...resource.configurations ?? [], configuration] } as UIEditResource)
    }

    const removeConfig = (idx: number) => {
        let newConfigs = [...resource.configurations!]
        newConfigs.splice(idx, 1)
        console.log(newConfigs)
        setResource({ ...resource, configurations: newConfigs } as UIEditResource)
    }

    const saveResource = async () => {
        if (resource.manufactor?.new) {
            await resourceService.saveManufactures({ id: resource.manufactor.id!, name: resource.manufactor.name })
        }
        if (resource.type?.new) {
            await resourceService.saveType({ id: resource.type.id!, name: resource.type.name })
        }
        let resourceToUpdate = Object.assign(new UIEditResource({} as Resource), resource).toResource()
        console.log(JSON.stringify(resourceToUpdate))
        await resourceService.updateResource(resourceToUpdate)
        navigate("/resources")
    }

    return !loaded ? <></> : (<>
        <Box>
            <Container sx={{ marginTop: "24px" }}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center"
                    sx={{ textAlign: "center" }}>
                    <ComputerIcon sx={{ marginRight: "1rem", fontSize: "3rem", color: "#F18F01" }} />
                    <Typography variant="h3" > Criar novo recursos</Typography>
                </Grid>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}
                    sx={{ marginTop: "10px" }}>
                    <Grid item xs={6}>
                        <TextField value={resource.id} disabled variant="outlined" color="secondary"
                            label="Id" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField value={resource.description} variant="outlined" color="secondary"
                            onChange={it => setResource({ ...resource, description: it.target.value } as UIEditResource)}
                            label="Descrição" sx={{ width: "100%" }} />
                    </Grid>

                    <Grid item xs={6}>
                        <Autocomplete freeSolo options={manufactures.length ? manufactures.map(m => m.name) : []}
                            onChange={(oldValue, newValue) => setManufactureOnResource(newValue!)}
                            defaultValue={resource.manufactor?.name ?? ''}
                            value={resource.manufactor?.name ?? ''}
                            renderInput={param => <TextField {...param}
                                onChange={e => setManufactureOnResource(e.target.value)}
                                value={resource.manufactor?.name ?? ''} color="secondary"
                                label="Fabricante" />} />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete freeSolo options={types.length ? types.map(m => m.name) : []}
                            defaultValue={resource.type?.name ?? ''}
                            value={resource.type?.name ?? ''}
                            onChange={(oldValue, newValue) => setTypeOnResource(newValue!)}
                            renderInput={param => <TextField {...param}
                                onChange={e => setTypeOnResource(e.target.value)}
                                value={resource.type?.name ?? ''} color="secondary"
                                label="Tipo" />} />
                    </Grid>
                </Grid>
                <Grid container direction={"row"} alignItems={"center"} justifyContent="center">
                    <Divider sx={{ marginTop: "20px", width: "100%" }}>Configurações</Divider>
                </Grid>
                <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: "10px" }}>

                    {resource.configurations?.map((configuration, idx) => {
                        return (
                            <Grid key={"config" + idx} container direction={"row"} justifyContent="space-between" alignItems="center" spacing={1} sx={{ marginTop: "10px" }}>
                                <Grid item xs={6}>
                                    <TextField value={resource.configurations![idx].component} color="secondary"
                                        onChange={it => changeConfiguration(idx, { description: resource.configurations![idx].description, component: it.target.value })}
                                        label="Componente" sx={{ width: "100%" }} />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField value={resource.configurations![idx].description} color="secondary"
                                        onChange={it => changeConfiguration(idx, { description: it.target.value, component: resource.configurations![idx].component })}
                                        label="Descrição" sx={{ width: "100%" }} />
                                </Grid>
                                <Grid item>
                                    {(resource.configurations?.length ?? 1) == 1
                                        ? <></>
                                        : <IconButton onClick={it => removeConfig(idx)} size="large" color="error" sx={{ border: "1px solid #FFA500" }}><RemoveIcon /></IconButton>
                                    }
                                </Grid>
                            </Grid>
                        )
                    })
                    }
                    <Grid>
                        <OrangeButton text="ADICIONAR" startIcon={<AddIcon />} styles={{ marginTop: "30px" }} onClick={() => addConfig()} />
                    </Grid>
                </Grid>
                {
                    resourceValid
                        ? <OrangeButton text="SAlVAR" startIcon={<CheckCircleIcon />} styles={{ position: "fixed", top: "90%", left: "90%" }} onClick={saveResource} />
                        : <OrangeButton text="SAlVAR" startIcon={<CheckCircleIcon />} styles={{ position: "fixed", top: "90%", left: "90%" }} disable />

                }
            </Container>
        </Box >
    </>)
}