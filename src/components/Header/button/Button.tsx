import { IconButton, Typography } from "@mui/material";
import React from "react";
import MaterialButton from "@mui/material/Button";

interface ButtonProps {
    color: string;
    textColor: string;
    text: string;
    icon?: React.ReactNode;
    styles?: React.CSSProperties;
    onClick?: () => void;
  }

const Button = ({
    text,
    color,
    textColor,
    icon,
    styles,
    onClick,
    ...props
 }: ButtonProps) => {
    const renderButton = () => {
        if (icon) {
          return (
            <IconButton
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: color,
                color: textColor,
                borderRadius: "28px",
                "&:hover": {
                  bgcolor: color,
                  color: textColor,
                },
                ...styles
              }}
              {...props}
            >
              <Typography sx={{ fontSize: "inherit", display: 'flex', alignItems: 'center' }}>
                {icon}
                {text}
              </Typography>
            </IconButton>
          );
        } else {
          return (
            <MaterialButton
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: "#F18F01",
                color: "black",
                borderRadius: "28px",
                fontSize: "14px",
                fontWeight: 600,
                padding: "0px",
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
            </MaterialButton>
          );
        }
      };
    
      return renderButton();
}