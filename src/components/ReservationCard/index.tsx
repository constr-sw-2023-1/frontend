import { Container } from "@mui/material";

export default function ReservationCard({ reservation }) {
  return (
    <Container
      style={{
        height: "88px",
        width: "688px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
      }}
    >
      <div>{reservation.titulo}</div>
      <div>{reservation.classe}</div>
      <div>{`Período de reserva: ${reservation.reservaInicio} - ${reservation.reservaFim}`}</div>
    </Container>
  );
}
