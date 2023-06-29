import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form'
import { Box, CircularProgress, Stack } from "@mui/material";
import { zodResolver } from '@hookform/resolvers/zod'
import Input from "@components/Input";
import { addBookSchema } from '@utils/schemas';
import HeaderCoursesComponent from "../components/HeaderCoursesComponent";
import ButtonCoursesComponent from '../components/ButtonCoursesComponent';
import { Close, Done } from '@mui/icons-material';
import { IAddBook } from '@shared/IAddBook';
import useBook from '@hooks/useBook';

export default function AddBookPage() {
    const { loading, addBook } = useBook()
    const navigate = useNavigate()
    const {
        control,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm<IAddBook>({
        resolver: zodResolver(addBookSchema),
        defaultValues: {
            name: '',
            author: '',
            category: '',
            isbn: '',
            language: '',
            publisher: '',
            numPages: undefined,
            year: undefined,
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    })

    async function handleAddBook() {
        await addBook(getValues(), 'test')
        navigate(-1)
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
        }}>
            <HeaderCoursesComponent title={"Adicionar Livro"} />
            <Stack sx={{
                width: '60%',
                height: '70%',
                overflow: 'hidden',
                py: '0.375rem',
                display: 'flex',
                alignItems: 'center',
            }} spacing={'0.75rem'}>
                {loading ? <CircularProgress />
                    :
                    (
                        <>
                            <Stack direction={'row'} sx={{
                                width: '100%',
                            }} spacing={'1.25rem'}>
                                <Controller
                                    control={control}
                                    name={'name'}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={'Nome'}
                                            onChange={onChange}
                                            value={value}
                                            errorMessage={errors.name?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={'author'}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={'Autor'}
                                            onChange={onChange}
                                            value={value}
                                            errorMessage={errors.author?.message}
                                        />
                                    )}
                                />
                            </Stack>

                            <Stack direction={'row'} sx={{
                                width: '100%',
                            }} spacing={'1.25rem'}>
                                <Controller
                                    control={control}
                                    name={'year'}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={'Ano'}
                                            onChange={onChange}
                                            value={value}
                                            errorMessage={errors.year?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={'numPages'}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={'Páginas'}
                                            onChange={onChange}
                                            value={value}
                                            errorMessage={errors.numPages?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack direction={'row'} sx={{
                                width: '100%',
                            }} spacing={'1.25rem'}>
                                <Controller
                                    control={control}
                                    name={'language'}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={'Idioma'}
                                            onChange={onChange}
                                            value={value}
                                            errorMessage={errors.language?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={'category'}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={'Categoria'}
                                            onChange={onChange}
                                            value={value}
                                            errorMessage={errors.category?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack direction={'row'} sx={{
                                width: '100%',
                            }} spacing={'1.25rem'}>
                                <Controller
                                    control={control}
                                    name={'publisher'}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={'Editora'}
                                            onChange={onChange}
                                            value={value}
                                            errorMessage={errors.publisher?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={'isbn'}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={'ISBN'}
                                            onChange={onChange}
                                            value={value}
                                            errorMessage={errors.isbn?.message}
                                        />
                                    )}
                                />
                            </Stack>
                        </>
                    )}
            </Stack>
            <Stack direction={'row'} sx={{
                width: '100%',
                height: '10%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: '2rem'
            }} spacing={'1.25rem'}>
                <ButtonCoursesComponent
                    content={'Salvar'}
                    icon={<Done sx={{
                        color: 'black',
                        mr: '0.5rem'
                    }} />}
                    onClick={handleSubmit(handleAddBook)}
                />
                <ButtonCoursesComponent
                    content={'Cancelar'}
                    icon={<Close sx={{
                        color: 'black',
                        mr: '0.5rem'
                    }} />}
                    onClick={() => navigate(-1)}
                />
            </Stack>
        </Box>
    )
}