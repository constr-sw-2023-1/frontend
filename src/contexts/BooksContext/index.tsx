import {
    ReactNode,
    createContext,
    useEffect,
    useState
} from "react";
import { AxiosResponse } from "axios";
import ToastComponent from "@components/ToastComponent";
import { IAddBook } from "@shared/IAddBook";
import * as api from '@services/api'
import { IBook } from "@shared/IBook";
import libraryAddCoursePageItems from "@assets/mocks/libraryAddCoursePageItems";

interface BookContextProps {
    loading: boolean
    books: IBook[]
    addBook: (Book: IAddBook, accessToken: string) => Promise<AxiosResponse<void>>
}

const BookContext = createContext<BookContextProps>({} as BookContextProps);

interface BookProviderProps {
    children: ReactNode
}

function BookProvider({ children }: BookProviderProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [books, setBooks] = useState<IBook[]>([])

    useEffect(() => {
        loadBooks('test')
    }, [])

    async function loadBooks(accessToken: string) {
        if (accessToken) {
            setLoading(true)

            try {
                // const response = await api.loadBooks(accessToken)
                const response = await new Promise<IBook[] | void>((resolve, reject) => {
                    setTimeout(() => {
                        resolve()
                    }, 2000);
                })

                setBooks(libraryAddCoursePageItems)
                setLoading(false)

                // return response as AxiosResponse<IBook[]>
                return response as IBook[]
            } catch (error: any) {
                if (!error?.response) {
                    <ToastComponent
                        message={"Erro no servidor interno"}
                        severity={'error'}
                        color={'error'}
                    />
                } else {
                    <ToastComponent
                        message={error?.status}
                        severity={'error'}
                        color={'error'}
                    />
                }

                setLoading(false)

                return error?.response
            }
        }
    }

    async function addBook(book: IAddBook, accessToken: string) {
        setLoading(true)

        try {
            // const response = await api.addBook(accessToken)
            const response = await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 2000);
            })

            setBooks(libraryAddCoursePageItems)
            // setBooks(current => [data, ...current])
            setLoading(false)

            // return response as AxiosResponse<void>
            return response as void
        } catch (error: any) {
            if (!error?.response) {
                <ToastComponent
                    message={"Erro no servidor interno"}
                    severity={'error'}
                    color={'error'}
                />
            } else if (error?.status === 400) {
                <ToastComponent
                    message={"Erro ao adicionar livro"}
                    severity={'error'}
                    color={'error'}
                />
            } else {
                <ToastComponent
                    message={error?.status}
                    severity={'error'}
                    color={'error'}
                />
            }

            setLoading(false)

            return error?.response
        }
    }

    return (
        <BookContext.Provider value={{
            loading,
            books,
            addBook
        }}>
            {children}
        </BookContext.Provider>
    );
};

export { BookContext, BookProvider }