import { IProfessor } from '@pages/PrivatePages/Professors/model/professor';
import axios from '@utils/api';

const api = axios({baseURL: 'http://localhost:8083'});

export const findAll = () => {
	return api.get('/professors');
}

export const create = (req: IProfessor) => {
	return api.post('/professors', req);
}

export const update = (id: string, req: IProfessor) => {
	return api.put(`/professors/${id}`, req);
}

export const findById = (id: string) => {
	return api.get(`/professors/${id}`);
}

export const deleteById = (id: string) => {
	return api.delete(`/professors/${id}`);
}
