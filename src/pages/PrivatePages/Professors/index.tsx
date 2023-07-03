import { Box, Container, Icon, Typography } from '@mui/material';
import React from 'react';
import './Professors.css';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import { Professor } from './model/professor';

const ProfessorList = (): JSX.Element => {

  const [professors, setProfessors] = React.useState<Professor[]>([]);

  return (
    <Container disableGutters className="lessonsContainer">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "0.15rem",
          margin: "1rem",
          padding: "0.5rem"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <WorkOutlinedIcon htmlColor="#005288" />
          <Typography variant="h4" fontWeight={500} color={"#191308"}>
            Professores
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "#5D707F",
            fontWeight: 500,
            fontSize: "1.5rem",
            marginBottom: "1rem",
            paddingTop: "1rem"
          }}
        >
          Lista de Professores
        </Typography>

        <Box>
        {professors.map((professor) => (
          <Box
            key={professor.name}

            sx={{
              width: "70%",
              backgroundColor: "#FFFFFF",
              borderRadius: "0.2rem",
              padding: "0.25rem 1rem",
              marginBottom: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          />
        ))}
        </Box>

        </Box>
        <div className="buttonContainer">
        </div>
    </Container>
  );
};

export default ProfessorList;