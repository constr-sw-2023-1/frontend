import { Box, BoxProps, Typography, useTheme } from "@mui/material";

interface HeaderCourseProps extends BoxProps {
    title: string
}

export default function HeaderCoursesComponent({ title, ...props }: HeaderCourseProps) {
    const { palette: { text } } = useTheme()

    return (
        <Box sx={{
            width: '100%',
            height: '20%',
            minHeight: '100px',
        }} {...props}>
            <Typography sx={{
                color: text.primary,
                fontWeight: 600,
                fontSize: '2.125rem'
            }}>{title}</Typography>
        </Box>
    )
}