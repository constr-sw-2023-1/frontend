import { useContext } from "react"
import { CourseContext } from "@contexts/CourseContext"

export default function useCourse() {
    const courseContext = useContext(CourseContext)

    return courseContext
}