import { z } from 'zod'
import { addCourseSchema } from '@utils/schemas'

export type IAddCourse = z.infer<typeof addCourseSchema>