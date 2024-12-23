export function openImagePopup(link, name) {
    const imagePopup = document.querySelector('.popup_type_image');
    const imageElement = imagePopup.querySelector('.popup__image');
    const captionElement = imagePopup.querySelector('.popup__caption');

    imageElement.src = link;
    imageElement.alt = name;
    captionElement.textContent = name;

    openModal(imagePopup);
}

export function openModal(popup) {
    popup.classList.add("popup_is-opened");
    setTimeout(() => {
        popup.style.visibility = 'visible';
    }, 0);
    document.addEventListener('keydown', closeByEsc);
}

export function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
    setTimeout(() => {
        popup.style.visibility = 'hidden';
    }, 300);
    document.removeEventListener('keydown', closeByEsc);
}

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closeModal(popup);
    });
});

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closeModal(popup);
        }
    });
});

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

import { updateAvatar } from './api.js';

const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarForm = editAvatarPopup.querySelector('.popup__form');
const avatarInput = editAvatarForm.querySelector('.popup__input_type_avatar-url');
const avatarEditIcon = document.querySelector('.profile__avatar-edit-icon');
const avatarImage = document.querySelector('.profile__image');

avatarEditIcon.addEventListener('click', () => {
    openModal(editAvatarPopup);
});

editAvatarForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newAvatarUrl = avatarInput.value;

    if (avatarImage) {
        console.log('Обновление аватара:', newAvatarUrl);
        updateAvatar(newAvatarUrl)
            .then((data) => {
                avatarImage.style.backgroundImage = `url(${newAvatarUrl})`;
                closeModal(editAvatarPopup);
            })
            .catch((err) => {
                console.error('Ошибка при обновлении аватара:', err);
                alert('Ошибка обновления аватара. Попробуйте снова.');
            });
    } else {
        console.error('Элемент profile__image не найден');
    }
});
