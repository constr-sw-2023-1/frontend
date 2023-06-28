import { z } from "zod"

const addCourseSchema = z.object({
    name: z.string().trim().nonempty('Campo obrigatório')
        .min(3, 'Nome curto')
        .max(100, 'Limite de caracteres atingido'),
    codCred: z.string().trim().nonempty('Campo obrigatório')
        .length(8, 'Formato inválido'),
    books: z.string().trim().nonempty('Campo obrigatório'),
    credits: z.coerce.number({ required_error: 'Campo obrigatório' })
        .min(2, 'Deve conter pelo menos 2 créditos')
        .max(8, 'Deve conter no máximo 8 créditos'),
    description: z.string().trim().nonempty('Campo obrigatório')
        .max(500, 'Limite de caracteres atingido')
})


export { addCourseSchema }