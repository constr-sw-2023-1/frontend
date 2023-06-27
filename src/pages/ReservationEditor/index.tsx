import { useLocation, useNavigate } from "react-router-dom";
import Header from "@components/Header";
import { Container } from "@mui/material";
import ReservationIcon from "@mui/icons-material/PendingActions";
import dateFormatter from "@utils/dateFormatter";

const ReservationEditor = () => {
  const { state } = useLocation();
  const reservation = state;
  const navigate = useNavigate();
  const handleReservationSaveClick = () => {
    navigate("/");
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
          <div>Criar/Editar Reserva</div>
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
          <div>Professor/Aluno</div>
        </Container>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            width: "940px",
          }}
        >
          <input
            type="text"
            value={reservation?.titulo}
            placeholder="Nome do Recurso"
          />
          <input
            type="text"
            value={reservation?.classe}
            placeholder="Nome da Classe"
          />
          <Container
            style={{
              padding: "0",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <input
              type="date"
              value={dateFormatter(reservation?.reservaInicio)}
            />
            <input type="date" value={dateFormatter(reservation?.reservaFim)} />
          </Container>
        </Container>
        <button onClick={handleReservationSaveClick}>Salvar</button>
      </Container>
    </Container>
  );
};

export default ReservationEditor;
