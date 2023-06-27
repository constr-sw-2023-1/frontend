import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ReservationCard({
  reservation,
  reservations,
  setReservations,
}) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editor/${reservation?.id}`, { state: reservation });
  };

  const handleDeleteClick = () => {
    const filteredReservationList = reservations.filter(
      (item) => item.id != reservation.id
    );
    setReservations(filteredReservationList);
  };

  return (
    <Container
      style={{
        padding: "0",
        paddingRight: "20px",
        height: "88px",
        width: "688px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid black",
      }}
    >
      <Container
        style={{
          height: "88px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>{reservation.titulo}</div>
        <div>{reservation.classe}</div>
        <div>{`Período de reserva: ${reservation.reservaInicio} - ${reservation.reservaFim}`}</div>
      </Container>
      <button onClick={handleEditClick}>Editar Reserva</button>
      <button onClick={handleDeleteClick}>Excluir Reserva</button>
    </Container>
  );
}
