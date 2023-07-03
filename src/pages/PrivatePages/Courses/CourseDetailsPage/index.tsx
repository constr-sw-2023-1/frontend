import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import HeaderCoursesComponent from "../components/HeaderCoursesComponent";
import { useLocation, useNavigate } from "react-router";
import ICourse from "@shared/ICourse";
import InfoCourseComponent from "../components/InfoCourseComponent";
import CardComponent from "../components/CardComponent";
import ButtonCoursesComponent from "../components/ButtonCoursesComponent";
import { Add, Edit } from "@mui/icons-material";
import useBook from "@hooks/useBook";
import { IBook } from "@shared/IBook";

export default function CourseDetailsPage() {
    const { palette: { text } } = useTheme()
    const { loading } = useBook()
    const navigate = useNavigate()
    const location = useLocation()
    const course = location.state as ICourse
    const { id, name, codCred, numCredits, books, description } = course

    function Skeletons() {
        const skeletons = [1, 2, 3, 4, 5]
        return skeletons.map(({ }, index) => (
            <Skeleton
                key={index}
                variant={"rounded"}
                animation={"wave"}
                width={'100%'}
                height={'80px'}
            />
        ))
    }

    function handleNavigateToBookDetails(book: IBook) {
        navigate(`/app/books/details/:${book.id}`, { state: book })
    }

    function handleRender() {
        return <Stack sx={{
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            overflowX: 'hidden',
            padding: '3px',
        }} spacing={'0.75rem'}>
            {loading ? Skeletons()
                : books?.map((book) => (
                    <CardComponent
                        key={book.id}
                        name={book.name}
                        firstInfo={book.author}
                        secondInfo={book.year}
                        onClick={() => handleNavigateToBookDetails(book)}
                    />
                ))
            }
        </Stack>
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            position: 'relative'
        }}>
            <HeaderCoursesComponent title={name} />
            <Stack direction={'column'} sx={{
                width: '70%',
                height: '80%',
                overflow: 'hidden',
            }} spacing={'1rem'}>
                <Stack direction={'row'} sx={{
                    width: '100%',
                    height: '8%',
                    overflow: 'hidden',
                }} spacing={'3rem'}>
                    <InfoCourseComponent label={'Cód Cred'} value={codCred} />
                    <InfoCourseComponent label={'Créditos'} value={numCredits} />
                </Stack>
                <Box sx={{ width: '100%', height: '12%' }}>
                    <Typography sx={{
                        color: text.primary,
                        fontWeight: 600,
                        fontSize: '1rem'
                    }}>{'Descrição'}</Typography>
                    <Typography sx={{
                        color: text.secondary,
                        fontWeight: 500,
                        fontSize: '0.875rem'
                    }}>{description}</Typography>
                </Box>
                <Stack direction={'column'} sx={{
                    width: '100%',
                    height: '70%',
                    display: 'flex',
                }}>
                    <Typography sx={{
                        color: text.primary,
                        fontWeight: 600,
                        fontSize: '1rem',
                        pb: '1rem'
                    }}>{'Bibliografia'}</Typography>
                    {handleRender()}
                </Stack>
            </Stack>
            <Stack direction={'row'} sx={{
                position: 'absolute',
                right: '1.5rem',
                bottom: '1.25rem'
            }} spacing={'0.75rem'}>
                <ButtonCoursesComponent
                    content={'Editar'}
                    icon={<Edit sx={{
                        color: 'black',
                        mr: '0.5rem'
                    }} />}
                    onClick={() => { }}
                />
                <ButtonCoursesComponent
                    content={'Adicionar Livro'}
                    icon={<Add sx={{
                        color: 'black',
                        mr: '0.5rem'
                    }} />}
                    onClick={() => navigate('/app/books/add')}
                />
            </Stack>
        </Box>
    )
}