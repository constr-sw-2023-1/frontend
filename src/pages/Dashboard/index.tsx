import { useReservations } from "../../hooks/use-reservation";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import { Box, Container } from "@mui/material";
import ReservationIcon from "@mui/icons-material/PendingActions";
import ReservationCard from "@components/ReservationCard";

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const fetchReservations = async () => {
      const { getReservations } = useReservations();
      const response = await getReservations();
      setReservations(response);
    };
    fetchReservations();
  }, []);

  console.log(reservations);

  return (
    <Container>
      <Header />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          alignItems: "center",
          padding: "150px",
          gap: "none",
        }}
      >
        <Container
          style={{
            alignItems: "center",
            display: "flex",
            width: "640px",
            fontSize: "34px",
            fontFamily: "monospace",
            fontWeight: "600",
          }}
        >
          <ReservationIcon style={{ width: "36px", height: "36px" }} />
          <div>Reservas</div>
        </Container>
        <Container
          style={{
            alignItems: "center",
            display: "flex",
            width: "640px",
            height: "30px",
            fontSize: "24px",
            fontFamily: "monospace",
            fontWeight: "600",
          }}
        >
          <div>Lista de Reservas</div>
        </Container>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            width: "640px",
          }}
        >
          {reservations?.length
            ? reservations.map((item, index) => (
                <ReservationCard reservation={item} key={index} />
              ))
            : "Não há reservas."}
        </Container>
      </Container>
    </Container>
  );
};

export default Dashboard;
