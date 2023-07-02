import { api as oauthApi } from "./oauthApi"

interface LoginResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
}

const login = async (email: string, password: string) => {
    const body = builLoginBody(email, password);

    const response = await oauthApi.post('/login', body, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
    }});

    return response.data as LoginResponse;
}

const builLoginBody = (email: string, password: string) => {
    const form = new URLSearchParams();
    form.append('username', email);
    form.append('password', password);

    form.append('client_id', 'oauth');
    form.append('client_secret', '04bfUatIDO6ipwg1TF2mTzHrX8UZD02Z');
    form.append('grant_type', 'password');

    return form;
}

export { login };