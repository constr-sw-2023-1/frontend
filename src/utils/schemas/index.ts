import { z } from "zod"

const addCourseSchema = z.object({
    name: z.string().trim().nonempty('Campo obrigatório')
        .min(3, 'Nome curto')
        .max(100, 'Limite de caracteres atingido'),
    codCred: z.string().trim().nonempty('Campo obrigatório')
        .length(8, 'Formato inválido'),
    books: z.array(z.string().trim(), { required_error: 'Campo obrigatório' })
        .min(1, 'Escolha pelo menos 1'),
    credits: z.coerce.number({ required_error: 'Campo obrigatório' })
        .min(2, 'Deve conter pelo menos 2 créditos')
        .max(8, 'Deve conter no máximo 8 créditos'),
    description: z.string().trim().nonempty('Campo obrigatório')
        .max(500, 'Limite de caracteres atingido')
})

const addBookSchema = z.object({
    name: z.string().trim().nonempty('Campo obrigatório')
        .min(3, 'Nome curto')
        .max(100, 'Limite de caracteres atingido'),
    author: z.string().trim().nonempty('Campo obrigatório')
        .min(3, 'Nome do autor curto')
        .max(100, 'Limite de caracteres atingido'),
    year: z.coerce.number({ invalid_type_error: 'Campo obrigatório' }),
    numPages: z.coerce.number({ invalid_type_error: 'Campo obrigatório' }),
    language: z.string().trim().nonempty('Campo obrigatório')
        .max(100, 'Limite de caracteres atingido'),
    category: z.string().trim().nonempty('Campo obrigatório')
        .max(100, 'Limite de caracteres atingido'),
    publisher: z.string().trim().nonempty('Campo obrigatório')
        .max(100, 'Limite de caracteres atingido'),
    isbn: z.string().trim().nonempty('Campo obrigatório')
        .length(13, 'Formato inválido')
})


export { addCourseSchema, addBookSchema }