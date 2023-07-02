import axios from "axios"
import { Student } from "./model/student"

export const fetchStudents = async () => {
    const res = await axios.get("http://localhost:8080/students")
    return res.data.students.students
}

export const createStudent = async (studentData: Student) => {
    const res = await axios.post("http://localhost:8080/students", studentData)
    return res.data

}

export const deleteStudents = async (studentId: number | string) => {
    const res = await axios.delete("http://localhost:8080/students/" + studentId)
}