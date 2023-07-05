import Header from "@components/Header";
import ComputerIcon from '@mui/icons-material/Computer';
import { Autocomplete, Box, Button, Container, Divider, Grid, IconButton, Input, TextField, Typography } from "@mui/material";
import ResourceService, { CreateResource, ResourceConfiguration, ResourceManufacturer, ResourceType } from "@services/Resources";
import { v4 as uuidv4 } from 'uuid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCallback, useEffect, useState } from "react";
import OrangeButton from "./component/OrangeButton";

const resourceService = new ResourceService()

type UITypeManufacture = {
    id?: string
    name?: string
    new?: boolean
}

class UICreateResource {
    id?: string
    description?: string
    manufactor?: UITypeManufacture
    type?: UITypeManufacture
    configurations?: ResourceConfiguration[]

    toCreate(): CreateResource {
        let resource = Object.assign(new CreateResource(), this)
        return resource
    }
}

export default function ResourcesCreate() {

    const [newResource, setNewResource] = useState({id: uuidv4()} as UICreateResource)
    const [types, setTypes] = useState([] as UITypeManufacture[])
    const [manufactures, setManufactures] = useState([] as UITypeManufacture[])

    const initPage = useCallback(() => {
        resourceService.loadTypes()
            .then(response => {
                setTypes(response.data.map(it => { return { ...it, new: false } }) as UITypeManufacture[])
                return resourceService.loadManufacturers()
            }).then(response => setManufactures(response.data.map(it => { return { ...it, new: false } }) as UITypeManufacture[]))
    }, [])
    useEffect(() => {
        console.log("Loaded Resources");
        initPage()
    }, [initPage])

    useEffect(() => {
        console.log(newResource)
    }, [newResource])

    const setTypeOnResource = (typeName: string) => {
        let type = types.find(t => typeName == t.name) ?? { name: typeName, id: uuidv4(), new: true }
        setNewResource({ ...newResource, type } as UICreateResource)
    }

    const setManufactureOnResource = (manufactorName: string) => {
        let manufactor = manufactures.find(t => manufactorName == t.name) ?? { name: manufactorName, id: uuidv4(), new: true }
        setNewResource({ ...newResource, manufactor } as UICreateResource)
    }

    const changeConfiguration = (idx: number, { description, component }: any) => {
        let configurations = newResource.configurations!
        configurations[idx] = { description, component }
        setNewResource({ ...newResource, configurations } as UICreateResource)
    }

    const addConfig = () => {
        let configuration = { description: '', component: '' }
        setNewResource({ ...newResource, configurations: [...newResource.configurations ?? [], configuration] } as UICreateResource)
    }

    const removeConfig = (idx: number) => {
        let newConfigs = [...newResource.configurations!]
        newConfigs.splice(idx, 1)
        console.log(newConfigs)
        setNewResource({ ...newResource, configurations: newConfigs } as UICreateResource)
    }

    const saveNewResource = async () => {
        if(newResource.manufactor?.new) {
            await resourceService.saveManufactures({id: newResource.manufactor.id!, name: newResource.manufactor.name})
        }
        if(newResource.type?.new) {
            await resourceService.saveType({id: newResource.type.id!, name: newResource.type.name})
        }
        let resourceToCreate = Object.assign(new UICreateResource(), newResource).toCreate()
        await resourceService.saveNewResource(resourceToCreate)
        window.location.href = "/resources"
    }

    return (
        <>
            <Box>
                <Container sx={{ marginTop: "100px" }}>
                    <Header />
                    <Grid container direction="row" justifyContent="center" alignItems="center"
                        sx={{ textAlign: "center" }}>
                        <ComputerIcon sx={{ marginRight: "1rem", fontSize: "3rem", color: "#F18F01" }} />
                        <Typography variant="h3" > Criar novo recursos</Typography>
                    </Grid>
                </Container>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}
                    sx={{ marginTop: "10px" }}>
                    <Grid item xs={5}>
                        <TextField value={newResource.id ?? uuidv4()} disabled
                            label="Id" sx={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField value={newResource.description ?? ''}
                            onChange={it => setNewResource({ ...newResource, description: it.target.value } as UICreateResource)}
                            label="Descrição" sx={{ width: "100%" }} />
                    </Grid>

                    <Grid item xs={5}>
                        <Autocomplete freeSolo options={manufactures.length ? manufactures.map(m => m.name) : []}
                            renderInput={param => <TextField {...param}
                                value={newResource.id}
                                onChange={e => setManufactureOnResource(e.target.value)}
                                label="Fabricante" />} />
                    </Grid>
                    <Grid item xs={5}>
                        <Autocomplete freeSolo options={types.length ? types.map(m => m.name) : []}
                            renderInput={param => <TextField {...param}
                                value={newResource.id}
                                onChange={e => setTypeOnResource(e.target.value)}
                                label="Tipo" />} />
                    </Grid>
                </Grid>
                <Grid container direction={"row"} alignItems={"center"} justifyContent="center">
                    <Divider sx={{ marginTop: "20px", width: "80%" }}>Configurações</Divider>
                </Grid>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: "10px" }}>

                    {newResource.configurations?.map((configuration, idx) => {
                        return (
                            <Grid key={"config" + idx} container direction={"row"} justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: "10px" }}>
                                <Grid item xs={5}>
                                    <TextField value={newResource.configurations![idx].component}
                                        onChange={it => changeConfiguration(idx, { description: newResource.configurations![idx].description, component: it.target.value })}
                                        label="Componente" sx={{ width: "100%" }} />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField value={newResource.configurations![idx].description}
                                        onChange={it => changeConfiguration(idx, { description: it.target.value, component: newResource.configurations![idx].component })}
                                        label="Descrição" sx={{ width: "90%" }} />
                                    <IconButton onClick={it => removeConfig(idx)} size="large" color="error" sx={{ marginRight: '1rem' }}><RemoveIcon /></IconButton>
                                </Grid>
                            </Grid>
                        )
                    })
                    }
                    <Grid>
                        <OrangeButton text="ADICIONAR" startIcon={<AddIcon />} styles={{ marginTop: "10px" }} onClick={() => addConfig()} />
                    </Grid>
                </Grid>

                <OrangeButton text="SAlVAR" startIcon={<CheckCircleIcon />} styles={{ position: "fixed", top: "90%", left: "90%" }} onClick={saveNewResource} />
            </Box >
        </>
    )
}