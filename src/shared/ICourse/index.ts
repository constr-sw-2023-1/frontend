import { IBook } from "@shared/IBook"

export default interface ICourse {
    id: string
    name: string
    codCred: string
    books: IBook[]
    numCredits: number
    description: string
}