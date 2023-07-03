import { Box, Skeleton, Stack } from "@mui/material";
import HeaderCoursesComponent from "../components/HeaderCoursesComponent";
import { useLocation } from "react-router";
import { IBook } from "@shared/IBook";
import InfoCourseComponent from "../components/InfoCourseComponent";
import ButtonCoursesComponent from "../components/ButtonCoursesComponent";
import { Edit } from "@mui/icons-material";

export default function BookDetailsPage() {
    const location = useLocation()
    const book = location.state as IBook
    const { id, author, category, isbn, language, name, numPages, publisher, year } = book

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
                    <InfoCourseComponent label={'Autor'} value={author} />
                    <InfoCourseComponent label={'Ano'} value={year} />
                </Stack>
                <Stack direction={'row'} sx={{
                    width: '100%',
                    height: '8%',
                    overflow: 'hidden',
                }} spacing={'3rem'}>
                    <InfoCourseComponent label={'Páginas'} value={numPages} />
                    <InfoCourseComponent label={'Idioma'} value={language} />
                </Stack>
                <Stack direction={'row'} sx={{
                    width: '100%',
                    height: '8%',
                    overflow: 'hidden',
                }} spacing={'3rem'}>
                    <InfoCourseComponent label={'Editor'} value={publisher} />
                    <InfoCourseComponent label={'Categoria'} value={category} />
                </Stack>
                <Stack direction={'row'} sx={{
                    width: '50%',
                    height: '8%',
                    overflow: 'hidden',
                    pr: '1.5rem'
                }}>
                    <InfoCourseComponent label={'ISBN'} value={isbn} />
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
                </Stack>
            </Stack>
        </Box>
    )
}