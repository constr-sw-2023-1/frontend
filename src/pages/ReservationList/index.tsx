import { useReservations } from "../../hooks/use-reservation";
import { useEffect, useState } from "react";
import Header from "@components/Header";
import { Container } from "@mui/material";
import ReservationIcon from "@mui/icons-material/PendingActions";
import ReservationCard from "@components/ReservationCard";

const mockedList = [
  {
    id: 1,
    titulo: "reserva 1",
    classe: "classe 1",
    reservaInicio: "01/01/2023",
    reservaFim: "31/12/2023",
  },
  {
    id: 2,
    titulo: "reserva 2",
    classe: "classe 2",
    reservaInicio: "01/01/2023",
    reservaFim: "31/12/2023",
  },
  {
    id: 3,
    titulo: "reserva 3",
    classe: "classe 3",
    reservaInicio: "01/01/2023",
    reservaFim: "31/12/2023",
  },
  {
    id: 4,
    titulo: "reserva 4",
    classe: "classe 4",
    reservaInicio: "01/01/2023",
    reservaFim: "31/12/2023",
  },
  {
    id: 5,
    titulo: "reserva 5",
    classe: "classe 5",
    reservaInicio: "01/01/2023",
    reservaFim: "31/12/2023",
  },
  {
    id: 6,
    titulo: "reserva 6",
    classe: "classe 6",
    reservaInicio: "01/01/2023",
    reservaFim: "31/12/2023",
  },
];

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const fetchReservations = async () => {
      const { getReservations } = useReservations();
      const response = await getReservations();
      if (response?.length) {
        setReservations(response);
      }
    };
    fetchReservations();
  }, []);

  const handleCreateReservationClick = () => {
    if (mockedList[reservations?.length]) {
      setReservations([...reservations, mockedList[reservations?.length]]);
    }
  };

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
                <ReservationCard
                  reservation={item}
                  key={index}
                  reservations={reservations}
                  setReservations={setReservations}
                />
              ))
            : "Não há reservas."}
        </Container>
        <button
          onClick={handleCreateReservationClick}
          disabled={!mockedList[reservations?.length]}
        >
          Adicionar Reserva
        </button>
      </Container>
    </Container>
  );
};

export default ReservationList;
