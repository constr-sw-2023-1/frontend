import Header from "@components/Header";
import ComputerIcon from '@mui/icons-material/Computer';
import { Autocomplete, Box, Button, Container, Grid, Input, TextField, Typography } from "@mui/material";
import ResourceService, { CreateResource, ResourceConfiguration, ResourceManufacturer, ResourceType } from "@services/Resources";
import { v4 as uuidv4 } from 'uuid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
        return {
            id: this.id,
            description: this.description,
            manufactorUUID: this.manufactor?.id,
            typeUUID: this.type?.id,
            configurations: this.configurations
        } as CreateResource
    }
}

export default function ResourcesCreate() {

    const [newResource, setNewResource] = useState({} as UICreateResource)
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
        setNewResource({...newResource, configurations: [...newResource.configurations ?? [], configuration]} as UICreateResource)
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
                            label="Description" sx={{ width: "100%" }} />
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
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    {newResource.configurations?.map((configuration, idx) => {
                        return (
                            <Grid container direction={"row"} justifyContent="center" alignItems="center" spacing={2}>
                                <Grid item xs={5}>
                                    <TextField value={newResource.configurations![idx].component}
                                        onChange={it => changeConfiguration(idx, { description: newResource.configurations![idx].component, component: it.target.value })}
                                        label="Id" sx={{ width: "100%" }} />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField value={newResource.configurations![idx].description}
                                        onChange={it => changeConfiguration(idx, { description: it.target.value, component: newResource.configurations![idx].component })}
                                        label="Description" sx={{ width: "100%" }} />
                                </Grid>
                            </Grid>
                        )
                    })
                    }
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <OrangeButton text="ADICIONAR" startIcon={<AddIcon />} onClick={() => addConfig()}/>
                    </Grid>
                </Grid>
                
                <OrangeButton text="SAlVAR" startIcon={<CheckCircleIcon />} styles={{ position: "fixed",top: "90%", left: "90%"}} onClick={() => undefined}/>
            </Box >
        </>
    )
}