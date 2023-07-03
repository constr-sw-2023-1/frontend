import {
    ReactNode,
    createContext,
    useEffect,
    useState
} from "react";
import { AxiosResponse } from "axios";
import coursesListPage from "@assets/mocks/coursesListPage";
import ToastComponent from "@components/ToastComponent";
import ICourse from "@shared/ICourse";
import { IAddCourse } from "@shared/IAddCourse";

interface CourseContextProps {
    loading: boolean
    courses: ICourse[]
    addCourse: (course: IAddCourse, accessToken: string) => Promise<AxiosResponse<void>>
}

const CourseContext = createContext<CourseContextProps>({} as CourseContextProps);

interface CourseProviderProps {
    children: ReactNode
}

function CourseProvider({ children }: CourseProviderProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [courses, setCourses] = useState<ICourse[]>([])

    useEffect(() => {
        loadCourses('test')
    }, [])

    async function loadCourses(accessToken: string) {
        if (accessToken) {
            setLoading(true)

            try {
                // const response = await api.loadCourses(accessToken)
                const response = await new Promise<ICourse[] | void>((resolve, reject) => {
                    setTimeout(() => {
                        resolve()
                    }, 2000);
                })

                setCourses(coursesListPage)
                setLoading(false)

                // return response as AxiosResponse<ICourse[]>
                return response as ICourse[]
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

    async function addCourse(course: IAddCourse, accessToken: string) {
        setLoading(true)

        try {
            // const response = await api.addCourse(accessToken)
            const response = await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 2000);
            })

            setCourses(coursesListPage)
            // setCourses(current => [data, ...current])
            setLoading(false)

            // return response as AxiosResponse<void>
            return response as void
        } catch (error: any) {
            if (!error?.response) {
                <ToastComponent
                    message={"Erro ao adicionar disciplina"}
                    severity={'error'}
                    color={'error'}
                />
            } else if (error?.status === 400) {
                <ToastComponent
                    message={"Erro ao adicionar disciplina"}
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
        <CourseContext.Provider value={{
            loading,
            courses,
            addCourse
        }}>
            {children}
        </CourseContext.Provider>
    );
};

export { CourseContext, CourseProvider }