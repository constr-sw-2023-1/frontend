import { Add } from "@mui/icons-material"
import { Button, ButtonProps, Typography, useTheme } from "@mui/material"

interface ButtonCoursesProps extends ButtonProps {
    content: string
}

export default function ButtonCoursesComponent({ content, ...props }: ButtonCoursesProps) {
    const { palette: { secondary, text } } = useTheme()

    return <Button sx={{
        height: '48px',
        py: '1rem',
        px: '1.25rem',
        bgcolor: secondary.main,
        borderRadius: '25px',
    }} {...props}>
        <Add sx={{
            color: 'black',
            mr: '1rem'
        }} />
        <Typography sx={{
            color: 'black',
            fontWeight: 500,
        }}>{content}</Typography>
    </Button>
}