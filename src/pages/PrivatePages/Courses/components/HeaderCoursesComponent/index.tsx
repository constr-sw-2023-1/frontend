import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";

interface HeaderCourseProps extends BoxProps {
    title: string
    mainScreen?: boolean
}

export default function HeaderCoursesComponent({ title, mainScreen = false, ...props }: HeaderCourseProps) {
    const { palette: { text } } = useTheme()
    const navigate = useNavigate()

    function handleNavigateToBack() {
        navigate(-1)
    }

    return (
        <Box sx={{
            width: '100%',
            height: '20%',
            minHeight: '80px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }} {...props}>
            {!mainScreen ?
                <ArrowBack
                    sx={{
                        mr: '2rem',
                        color: text.primary,
                        cursor: 'pointer'
                    }}
                    onClick={() => handleNavigateToBack()}
                />
                : null}
            <Typography sx={{
                color: text.primary,
                fontWeight: 600,
                fontSize: '2.125rem'
            }}>{title}</Typography>
        </Box>
    )
}