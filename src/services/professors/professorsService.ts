import api from "@utils/api"


const BASE_URL = "http://localhost:8083/professors"

const listProfessors = async () => {
    const response = await api({ baseURL: BASE_URL }).get("/");
    return response.data;
};

const deleteProfessor = async (id: string) => {
    const response = await api({ baseURL: BASE_URL }).delete(`/${id}`);
    return response.data;
}

export { listProfessors, deleteProfessor }