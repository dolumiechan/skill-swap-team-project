// API сервис для работы с backend
// Используйте этот файл для всех запросов к Laravel API

const API_BASE = 'http://127.0.0.1:8000/api';

export async function getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Ошибка получения категорий');
    return res.json();
}

export async function getServices() {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Ошибка получения сервисов');
    return res.json();
}

export async function getService(id) {
    const res = await fetch(`${API_BASE}/services/${id}`);
    if (!res.ok) throw new Error('Ошибка получения сервиса');
    return res.json();
}

export async function getUser(id, token) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Ошибка получения пользователя');
    return res.json();
}

export async function createService(data, token) {
    const res = await fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Ошибка создания сервиса');
    return res.json();
}

export async function createTransaction(data, token) {
    const res = await fetch(`${API_BASE}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Ошибка создания транзакции');
    return res.json();
}

export async function getTransactions(token) {
    const res = await fetch(`${API_BASE}/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Ошибка получения транзакций');
    return res.json();
}

export async function login(email, password) {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Ошибка авторизации');
    return res.json();
}

export async function register(data) {
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Ошибка регистрации');
    return res.json();
}
