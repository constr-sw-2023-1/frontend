import { Button, ButtonProps, Typography, useTheme } from "@mui/material"
import { ReactElement } from "react";

interface ButtonCoursesProps extends ButtonProps {
    content: string
    icon: ReactElement
}

export default function ButtonCoursesComponent({ content, icon, ...props }: ButtonCoursesProps) {
    const { palette: { secondary } } = useTheme()

    return <Button sx={{
        height: '48px',
        py: '1rem',
        px: '1.25rem',
        bgcolor: secondary.main,
        borderRadius: '25px',
    }} {...props}>
        {icon}
        <Typography sx={{
            color: 'black',
            fontWeight: 500,
        }}>{content}</Typography>
    </Button>
}