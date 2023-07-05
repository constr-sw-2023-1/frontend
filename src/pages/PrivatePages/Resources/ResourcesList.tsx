import { Box, Button, Card, CardContent, Container, Grid, IconButton, Skeleton, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import ResourceService, { Resource } from "@services/Resources"
import Header from "@components/Header";
import ComputerIcon from '@mui/icons-material/Computer';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OrangeButton from "./component/OrangeButton";
import { useNavigate } from "react-router-dom";

const resourceService = new ResourceService()

export default function ResourcesList() {

	const navigate = useNavigate()
	const [resources, setResources] = useState([] as Resource[])

	const loadResources = useCallback(() => {
		resourceService.loadResources()
			.then((response) => {
				setResources(response.data as Resource[])
			})
	}, [])

	useEffect(() => {
		console.log("Loaded Resources");
		loadResources();
	}, [loadResources])

	const removeResource = (resourceId: string) => {
		resourceService.deleteResource(resourceId)
			.then(() => {
				loadResources()
			})
	}

	return (
		<>
			<Box>
				<Container sx={{ marginTop: "24px" }}>
					<Grid container direction="row" justifyContent="flex-start" alignItems="center"
						sx={{ textAlign: "center" }}>
						<ComputerIcon sx={{ marginRight: "1rem", fontSize: "3rem", color: "#F18F01" }} />
						<Typography variant="h3" > Recursos</Typography>
					</Grid>
					<Box>
						<Typography variant="h5"> Lista de recursos</Typography>
						{resources.map(resource => {
							return (
								<Card key={resource.id} sx={{ marginTop: "15px" }}>
									<CardContent sx={{ ":hover": { bgcolor: '#EEF1EF' } }}>
										<Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
											<Box>
												<Typography variant="body1">{resource.description}</Typography>
												<Typography variant="body2" sx={{ color: "#6D8A96" }}>Disponível</Typography>
											</Box>
											<Box>
												<IconButton onClick={() => navigate(`/resources/edit/${resource.id}`)} size="large" sx={{ marginRight: '1rem' }}><EditIcon /></IconButton>
												<IconButton onClick={() => removeResource(resource.id)} size="large"><DeleteIcon color="error" /></IconButton>
											</Box>
										</Box>
									</CardContent>
								</Card>
							)
						})}
					</Box>
				</Container>
				<OrangeButton text="CRIAR" startIcon={<AddIcon />} styles={{ position: "fixed", top: "90%", left: "90%" }} onClick={() => navigate("/resources/create")} />
			</Box>
		</>
	);
}
