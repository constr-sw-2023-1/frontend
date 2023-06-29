import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import env from "./env"
import ICourse from "@shared/ICourse"
import { IBook } from "@shared/IBook"

const { APPLICATION_IP, PORT, PROTOCOL } = env

const uri = `${PROTOCOL}://${APPLICATION_IP}:${PORT}`

async function loadCourses(accessToken: string) {
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }
    const response = await axios.get<ICourse[]>(`${uri}/`, config)

    return response as AxiosResponse<ICourse[]>
}

async function addCourse(course: ICourse, accessToken: string) {
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }
    const response = await axios.post<void>(`${uri}/`, course, config)

    return response as AxiosResponse<void>
}

async function loadBooks(accessToken: string) {
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }
    const response = await axios.get<IBook[]>(`${uri}/`, config)

    return response as AxiosResponse<IBook[]>
}

async function addBook(book: IBook, accessToken: string) {
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }
    const response = await axios.post<void>(`${uri}/`, book, config)

    return response as AxiosResponse<void>
}

export { loadCourses, addCourse, loadBooks, addBook }