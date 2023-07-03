import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

interface ButtonBlueProps {
  text: string;
  icon?: React.ReactNode;
  styles?: React.CSSProperties;
  onClick?: () => void; // Adicionado o onClick
}

const ButtonBlue: React.FC<ButtonBlueProps> = ({ text, icon, styles, ...props }) => {
  const renderButton = () => {
    if (icon) {
      return (
        <IconButton
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: "#005288",
            color: "white",
            borderRadius: "28px",
            "&:hover": {
              bgcolor: "#0067ab",
              color: "white",
            },
            ...styles
          }}
          {...props}
        >
          <Typography sx={{ fontSize: "inherit", display: 'flex', alignItems: 'center', gap: '10px' }}>
            {icon}
            {text}
          </Typography>
        </IconButton>
      );
    } else {
      return (
        <Button
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: "#005288",
            color: "white",
            borderRadius: "28px",
            fontSize: "14px",
            fontWeight: 600,
            padding: "0px",
            "&:hover": {
              bgcolor: "#0067ab",
              color: "white",
            },
            ...styles
          }}
          variant="contained"
          {...props}
        >
          {text}
        </Button>
      );
    }
  };

  return renderButton();
};

export default ButtonBlue;
