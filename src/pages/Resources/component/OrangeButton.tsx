import { Button, Typography } from "@mui/material";

interface OrangeProps {
    text: string;
    startIcon?: React.ReactNode;
    styles?: React.CSSProperties;
    href?: string
    onClick?: () => void;
}


const OrangeButton: React.FC<OrangeProps> = ({ text, startIcon, styles, ...props }) => {
    const renderButton = () => {
        return (
            <Button href="" color="secondary" variant="contained" startIcon={startIcon}
                sx={{
                    borderRadius: '28px',
                    padding: '16px ',
                    color: 'black',
                    bgcolor: "#F18F01",
                    "&:hover": {
                        bgcolor: "#FFA500",
                        color: "black",
                    },
                    ...styles
                }}
                {...props}>
                <Typography sx={{ fontSize: "inherit", display: 'flex', alignItems: 'center' }}>
                    {text}
                </Typography>
            </Button>
        );
    };

    return renderButton();
};

export default OrangeButton;
