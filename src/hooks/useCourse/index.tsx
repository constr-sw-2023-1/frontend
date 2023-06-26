import { CourseContext } from "@contexts/CourseContext"
import { useContext } from "react"

export default function useCourse() {
    const courseContext = useContext(CourseContext)

    return courseContext
}