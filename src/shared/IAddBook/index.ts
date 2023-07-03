import { z } from 'zod'
import { addBookSchema } from '@utils/schemas'

export type IAddBook = z.infer<typeof addBookSchema>