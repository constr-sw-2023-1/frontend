import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

interface ButtonYellowProps {
  text: string;
  icon?: React.ReactNode;
  styles?: React.CSSProperties;
}

const ButtonYellow: React.FC<ButtonYellowProps> = ({ text, icon, styles, ...props }) => {
  const renderButton = () => {
    if (icon) {
      return (
        <IconButton
          sx={{
            bgcolor: "#F18F01",
            color: "black",
            borderRadius: "28px",
            "&:hover": {
              bgcolor: "#FFA500",
              color: "black",
            },
            ...styles
          }}
          {...props}
        >
          <Typography sx={{ fontSize: "inherit" }}>
            {icon}
            {text}
          </Typography>
        </IconButton>
      );
    } else {
      return (
        <Button
          sx={{
            bgcolor: "#F18F01",
            color: "black",
            borderRadius: "28px",
            fontSize: "14px",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#FFA500",
              color: "black",
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

export default ButtonYellow;
