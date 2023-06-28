import {
    ReactNode,
    createContext,
    useEffect,
    useState
} from "react";
import coursesListPage from "@assets/mocks/coursesListPage";
import ToastComponent from "@components/ToastComponent";
import ICourse from "@shared/ICourse";
import * as api from '@services/api'
import { AxiosResponse } from "axios";

interface CourseContextProps {
    loading: boolean
    courses: ICourse[]
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

                return response as ICourse[]
                // return response as AxiosResponse<ICourse[]>
            } catch (error: any) {
                if (!error?.response) {
                    <ToastComponent
                        message={"Erro ao carregar disciplinas"}
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

    return (
        <CourseContext.Provider value={{
            loading,
            courses,
        }}>
            {children}
        </CourseContext.Provider>
    );
};

export { CourseContext, CourseProvider }