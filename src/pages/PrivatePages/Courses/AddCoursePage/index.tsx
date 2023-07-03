import { Controller, useForm } from 'react-hook-form'
import { Autocomplete, Box, CircularProgress, Stack } from "@mui/material";
import libraryAddCoursePageItems from '@assets/mocks/libraryAddCoursePageItems';
import { zodResolver } from '@hookform/resolvers/zod'
import Input from "@components/Input";
import { IAddCourse } from '@shared/IAddCourse';
import { addCourseSchema } from '@utils/schemas';
import HeaderCoursesComponent from "../components/HeaderCoursesComponent";
import ButtonCoursesComponent from '../components/ButtonCoursesComponent';
import { Close, Done } from '@mui/icons-material';
import useCourse from '@hooks/useCourse';
import { useNavigate } from 'react-router';
import { IBook } from '@shared/IBook';

export default function AddCoursePage() {
    const { loading, addCourse } = useCourse()
    const navigate = useNavigate()
    const {
        control,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm<IAddCourse>({
        resolver: zodResolver(addCourseSchema),
        defaultValues: {
            name: '',
            codCred: '',
            books: [],
            credits: 0,
            description: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    })

    async function handleAddCourse() {
        await addCourse(getValues(), 'test')
        navigate('/app/courses', { replace: true })
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
        }}>
            <HeaderCoursesComponent title={"Adicionar Disciplina"} />
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
                                    name={'codCred'}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={'Cód Cred'}
                                            onChange={onChange}
                                            value={value}
                                            errorMessage={errors.codCred?.message}
                                        />
                                    )}
                                />
                            </Stack>

                            <Stack direction={'row'} sx={{
                                width: '100%',
                            }} spacing={'1.25rem'}>
                                <Controller
                                    control={control}
                                    name={'books'}
                                    render={({ field: { onChange, value } }) => (
                                        <Autocomplete
                                            multiple
                                            id={'tags-outlined'}
                                            sx={{ width: '100%' }}
                                            options={libraryAddCoursePageItems}
                                            getOptionLabel={({ name }: IBook) => name}
                                            renderInput={(params) => (
                                                <Input
                                                    {...params}
                                                    label={'Bibliografia'}
                                                    onChange={onChange}
                                                    value={value}
                                                    errorMessage={errors.books?.message}
                                                />
                                            )}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={'credits'}
                                    render={({ field: { onChange, value } }) => (
                                        <Input
                                            label={'Créditos'}
                                            onChange={onChange}
                                            value={value}
                                            errorMessage={errors.credits?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Controller
                                control={control}
                                name={'description'}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        multiline
                                        rows={4}
                                        maxRows={4}
                                        label={'Descrição'}
                                        onChange={onChange}
                                        value={value}
                                        errorMessage={errors.description?.message}
                                    />
                                )}
                            />
                        </>)}
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
                    onClick={handleSubmit(handleAddCourse)}
                />
                <ButtonCoursesComponent
                    content={'Cancelar'}
                    icon={<Close sx={{
                        color: 'black',
                        mr: '0.5rem'
                    }} />}
                    onClick={() => navigate('/app/courses', { replace: true })}
                />
            </Stack>
        </Box>
    )
}