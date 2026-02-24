import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

function errorMessage(err) {
    const data = err.response?.data;
    if (!data) return err.message || 'Ошибка запроса';
    if (data.errors && typeof data.errors === 'object') {
        const parts = Object.entries(data.errors).flatMap(([, v]) => (Array.isArray(v) ? v : [v]));
        return parts.join('\n');
    }
    return data.message || 'Ошибка запроса';
}

export function getCategories() {
    return api.get('/categories').then(res => res.data);
}

export function getServices() {
    return api.get('/services').then(res => res.data);
}

export function getService(id) {
    return api.get(`/services/${id}`).then(res => res.data);
}

export function getUser(id, token) {
    return api
        .get(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data)
        .catch(err => {
            throw new Error(errorMessage(err));
        });
}

export function createService(data, token) {
    return api
        .post('/services', data, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data)
        .catch(err => {
            throw new Error(errorMessage(err));
        });
}

export function updateService(id, data, token) {
    return api
        .put(`/services/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data)
        .catch(err => {
            throw new Error(errorMessage(err));
        });
}

export function deleteService(id, token) {
    return api
        .delete(`/services/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => ({}))
        .catch(err => {
            throw new Error(err.response?.data?.message || 'Ошибка удаления');
        });
}

export function createTransaction(data, token) {
    return api
        .post('/transactions', data, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data)
        .catch(err => {
            throw new Error(errorMessage(err));
        });
}

export function getTransactions(token) {
    return api
        .get('/transactions', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data)
        .catch(err => {
            throw new Error(errorMessage(err));
        });
}

export function login(email, password) {
    return api
        .post('/login', { email, password })
        .then(res => res.data)
        .catch(err => {
            throw new Error(errorMessage(err));
        });
}

export function register(data) {
    return api
        .post('/register', data)
        .then(res => res.data)
        .catch(err => {
            throw new Error(errorMessage(err));
        });
}
