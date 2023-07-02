import { Box, Button, Card, CardContent, Container, Grid, IconButton, Skeleton, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import ResourceService, { Resource } from "@services/Resources"
import Header from "@components/Header";
import ComputerIcon from '@mui/icons-material/Computer';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const resourceService = new ResourceService()

export default function ResourcesList() {

	const [resources, setResources] = useState([] as Resource[])

	const loadResources = useCallback(() => {
		resourceService.loadResources()
		.then((response) => setResources(response.data as Resource[]))
	}, [])

	useEffect(() => {
		console.log("Loaded Resources");
		loadResources();
	}, [loadResources])

	const CardList = resources.length ? resources.map(resource => {
		return (
			<Card key={resource.id} sx={{ marginTop: "15px" }}>
				<CardContent sx={{ ":hover": { bgcolor: '#EEF1EF' } }}>
					<Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<Box>
							<Typography variant="body1">{resource.description}</Typography>
							<Typography variant="body2" sx={{ color: "#6D8A96" }}>Disponível</Typography>
						</Box>
						<Box>
							<IconButton size="large" sx={{ marginRight: '1rem' }}><EditIcon /></IconButton>
							<IconButton size="large"><DeleteIcon color="error"/></IconButton>
						</Box>
					</Box>
				</CardContent>
			</Card>
		)
	}) : [1,2,3,4].map((id) => {
		return (
			<Skeleton key={`resource_card_skeleton${id}`} variant="rectangular" animation="wave" height={90} sx={{ marginTop: "15px" }}></Skeleton>
		)
	})

	return (
		<>
			<Box>
				<Container sx={{ marginTop: "100px" }}>
					<Header />
					<Grid container direction="row" justifyContent="center" alignItems="center"
						sx={{ textAlign: "center" }}>
						<ComputerIcon sx={{ marginRight: "1rem", fontSize: "3rem", color: "#F18F01" }} />
						<Typography variant="h3" > Recursos</Typography>
					</Grid>
					<Box>
						<Typography variant="h5"> Lista de recursos</Typography>
						{CardList}
					</Box>
				</Container>
				<Button href="/resources/create" color="secondary" variant="contained" startIcon={<AddIcon />}
					sx={{
						borderRadius: '28px',
						padding: '16px ',
						color: 'black',
						bgcolor: "#F18F01",
						position: "fixed",
						"&:hover": {
							bgcolor: "#FFA500",
							color: "black",
						},
						top: "90%",
						left: "90%"
					}}> CRIAR</Button>
			</Box>
		</>
	);
}
