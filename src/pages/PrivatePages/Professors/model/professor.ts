import { Dayjs } from "dayjs"
import { Identification } from "./identification"

export interface IProfessor {
    id?: string,
    registration: string,
    name: string,
    bornDate: Date | Dayjs,
    admissionDate: Date | Dayjs,
    active: boolean,
    identifications: Identification[]
}
