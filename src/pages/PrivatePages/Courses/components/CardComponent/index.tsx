import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface CardProps extends BoxProps {
    name: string
    firstInfo: number | string
    secondInfo: number | string
}

export default function CardComponent({
    name,
    firstInfo,
    secondInfo,
    ...props
}: CardProps) {
    const { palette: { text, error } } = useTheme()

    return (
        <Box sx={{
            width: '100%',
            height: '80px',
            bgcolor: 'white',
            boxShadow: '0 0 2px 0.5px #00000064',
            px: '20px',
            py: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: '0.4s',
            ":active": {
                transform: 'scale(0.99)'
            }
        }} {...props}>
            <Box sx={{
                flex: 1
            }}>
                <Typography sx={{
                    color: text.primary,
                    fontWeight: 600,
                    fontSize: '1rem'
                }}>{name}</Typography>
                <Typography sx={{
                    color: text.secondary,
                    fontWeight: 500,
                    fontSize: '0.875rem'
                }}>{firstInfo}</Typography>
                <Typography sx={{
                    color: text.secondary,
                    fontWeight: 500,
                    fontSize: '0.875rem'
                }}>{secondInfo}</Typography>
            </Box>
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}>
                <EditIcon sx={{
                    mr: '1rem',
                    color: text.primary
                }}
                    onClick={() => { }}
                />
                <DeleteIcon sx={{
                    color: error.main
                }}
                    onClick={() => { }}
                />
            </Box>
        </Box>
    )
}