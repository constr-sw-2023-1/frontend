import Header from "@components/Header";
import { Box, Container } from "@mui/material";
import ReservationIcon from "@mui/icons-material/PendingActions";
import ReservationCard from "@components/ReservationCard";

export default function Dashboard() {
  const list = [
    {
      titulo: "reserva 1",
      classe: "classe 1",
      reservaInicio: "01/01/2023",
      reservaFim: "31/12/2023",
    },
    {
      titulo: "reserva 2",
      classe: "classe 2",
      reservaInicio: "01/01/2023",
      reservaFim: "31/12/2023",
    },
    {
      titulo: "reserva 3",
      classe: "classe 3",
      reservaInicio: "01/01/2023",
      reservaFim: "31/12/2023",
    },
    {
      titulo: "reserva 4",
      classe: "classe 4",
      reservaInicio: "01/01/2023",
      reservaFim: "31/12/2023",
    },
    {
      titulo: "reserva 5",
      classe: "classe 5",
      reservaInicio: "01/01/2023",
      reservaFim: "31/12/2023",
    },
    {
      titulo: "reserva 6",
      classe: "classe 6",
      reservaInicio: "01/01/2023",
      reservaFim: "31/12/2023",
    },
  ];

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
          {list.map((item) => (
            <ReservationCard reservation={item} />
          ))}
        </Container>
      </Container>
    </Container>
  );
}
