export const BASE_URL = 'https://auth.nomoreparties.co';

//Запрос на регистрацию
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            if (res.status === 201) {
                return res.json();
            } else {
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            }
        })
        .catch(err => console.log(err));
};

//Вход в систему
export const signin = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            return data;
        })
        .catch(err => console.log(err));
}

//Проверка токена
export const getContent = token => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}