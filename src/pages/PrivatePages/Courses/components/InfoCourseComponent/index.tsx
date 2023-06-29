import { BoxProps, Typography, useTheme, Box } from "@mui/material";

export interface InfoCourseProps extends BoxProps {
    label: string
    value: string | number
}

export default function InfoCourseComponent({
    label,
    value,
    ...props
}: InfoCourseProps) {
    const { palette: { text } } = useTheme()

    return (
        <Box sx={{
            width: '100%',
            height: '50px',
            borderBottom: '1px solid #21212120',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
        }} {...props}>
            <Typography sx={{
                color: text.primary,
                fontWeight: 600,
                fontSize: '1rem'
            }}>{label}</Typography>
            <Typography sx={{
                color: text.secondary,
                fontWeight: 500,
                fontSize: '0.875rem'
            }}>{value}</Typography>
        </Box>
    )
}