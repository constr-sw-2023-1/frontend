import { useContext } from "react"
import { BookContext } from "@contexts/BooksContext"

export default function useBook() {
    const bookContext = useContext(BookContext)

    return bookContext
}