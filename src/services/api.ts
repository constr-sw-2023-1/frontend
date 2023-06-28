import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import env from "./env"
import ICourse from "@shared/ICourse"

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

export { loadCourses, addCourse }