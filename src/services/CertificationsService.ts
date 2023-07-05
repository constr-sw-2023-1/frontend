import { ICertification } from '@shared/ICertification';
import axios from '@utils/api';

const api = axios({baseURL: 'http://localhost:8083'});

export const findAll = () => {
	return api.get('/certifications');
}

export const create = (req: ICertification) => {
	return api.post('/certifications', req);
}

export const update = (id: string, req: ICertification) => {
	return api.put(`/certifications/${id}`, req);
}

export const findById = (id: string) => {
	return api.get(`/certifications/${id}`);
}

export const deleteById = (id: string) => {
	return api.delete(`/certifications/${id}`);
}
