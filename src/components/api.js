import { renderCards } from './card.js';

const token = '99b8cfcc-67c6-4ea1-86a2-8614f4c64d41';
const cohortId = 'apf-cohort-202';
let currentUserId;

export function loadUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        method: 'GET',
        headers: {
            authorization: token
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
        const avatarImage = document.querySelector('.profile__image');
        if (avatarImage) {
            avatarImage.style.backgroundImage = `url(${data.avatar})`;
        } else {
            console.error('Элемент profile__image не найден');
        }

        const profileTitle = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');
        if (profileTitle && profileDescription) {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
        } else {
            console.error('Элементы профиля не найдены');
        }

        return data;
    })
    .catch(err => {
        console.error(err);
        throw err;
    });
}

export function loadCards() {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
        method: 'GET',
        headers: {
            authorization: token
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export function updateProfile(name, about) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, about })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    });
}

export function addCard(name, link) {
    console.log('Добавление карточки:', { name, link });
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, link })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
        console.error('Ошибка при добавлении карточки:', err);
        throw err;
    });
}

export function deleteCard(cardId) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
        console.error('Ошибка при удалении карточки:', err);
        throw err;
    });
}

export function updateAvatar(avatarUrl) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ avatar: avatarUrl })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export function addLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: token
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function removeLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}
