import { useContext } from "react"
import { BookContext } from "@contexts/BookContext"

export default function useBook() {
    const bookContext = useContext(BookContext)

    return bookContext
}