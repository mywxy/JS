import { closeModal, openImagePopup } from './modal.js';
import { addCard, deleteCard, addLike, removeLike } from './api.js';

export function createCard({ name, link, likes = [], _id, owner }, currentUserId) {
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.cloneNode(true);

    const image = card.querySelector(".card__image");
    const title = card.querySelector(".card__title");
    const likeCount = card.querySelector(".card__like-counter");
    const deleteButton = card.querySelector(".card__delete-button");
    const likeButton = card.querySelector(".card__like-button");

    if (!image || !title || !likeCount || !likeButton) {
        console.error('Один из элементов не найден в карточке:', { image, title, likeCount, likeButton });
        return card;
    }

    image.src = link;
    image.alt = name;
    title.textContent = name;
    likeCount.textContent = likes.length;

    if (likes.some(like => like._id === currentUserId)) {
        likeButton.classList.add('card__like-button_active');
    }

    image.addEventListener("click", () => {
        openImagePopup(link, name);
    });

    if (owner._id === currentUserId) {
        deleteButton.style.display = 'block';
    } else {
        deleteButton.style.display = 'none';
    }

    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
            console.log('Удаление карточки ID:', _id);
            deleteCard(_id)
                .then(() => {
                    card.remove();
                    console.log('Карточка успешно удалена');
                })
                .catch(err => {
                    console.error('Ошибка при удалении карточки:', err);
                    alert('Ошибка при удалении карточки. Попробуйте снова.');
                });
        }
    });

    likeButton.addEventListener("click", () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active');

        if (isLiked) {
            console.log('Снятие лайка с карточки ID:', _id);
            removeLike(_id)
                .then(updatedCard => {
                    likeButton.classList.remove('card__like-button_is-active');
                    likeCount.textContent = updatedCard.likes.length;
                    console.log('Лайк успешно снят');
                })
                .catch(err => {
                    console.error('Ошибка при снятии лайка:', err);
                    alert('Ошибка при снятии лайка. Попробуйте снова.');
                });
        } else {
            console.log('Постановка лайка на карточку ID:', _id);
            addLike(_id)
                .then(updatedCard => {
                    likeButton.classList.add('card__like-button_is-active');
                    likeCount.textContent = updatedCard.likes.length;
                    console.log('Лайк успешно поставлен');
                })
                .catch(err => {
                    console.error('Ошибка при постановке лайка:', err);
                    alert('Ошибка при постановке лайка. Попробуйте снова.');
                });
        }
    });

    return card;
}

export function handleCardSubmit(e) {
    e.preventDefault();

    const cardNameInput = document.querySelector('.popup__input_type_card-name');
    const cardLinkInput = document.querySelector('.popup__input_type_url');

    const name = cardNameInput.value.trim();
    const link = cardLinkInput.value.trim();

    if (name === '' || link === '') {
        alert('Заполните все поля!');
        return;
    }

    const submitButton = e.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    console.log('Добавление новой карточки:', { name, link });
    addCard(name, link)
        .then(newCard => {
            const cardElement = createCard(newCard, currentUserId);
            document.querySelector('.places__list').prepend(cardElement);
            closeModal(document.querySelector('.popup_type_new-card'));
            cardNameInput.value = '';
            cardLinkInput.value = '';
            console.log('Карточка успешно добавлена');
        })
        .catch(err => {
            console.error('Ошибка при добавлении карточки:', err);
            alert('Ошибка добавления карточки. Попробуйте снова.');
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
            submitButton.disabled = false;
        });
}

export function renderCards(cards, currentUserId) {
    const cardContainer = document.querySelector('.places__list');
    cardContainer.innerHTML = '';

    if (Array.isArray(cards)) {
        cards.forEach(cardData => {
            const cardElement = createCard(cardData, currentUserId);
            cardContainer.appendChild(cardElement);
        });
        console.log('Карточки успешно отрисованы');
    } else {
        console.error('Ожидался массив карточек, но получено:', cards);
    }
}
