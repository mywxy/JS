import { openModal, closeModal } from './modal.js';
import { updateProfile, updateAvatar } from './api.js';

const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarForm = editAvatarPopup.querySelector('.popup__form');
const avatarInput = editAvatarForm.querySelector('.popup__input_type_avatar-url');
const avatarEditIcon = document.querySelector('.profile__avatar-edit-icon');
const avatarImage = document.querySelector('.profile__image');

avatarEditIcon.addEventListener('click', () => {
    openModal(editAvatarPopup);
});

editAvatarForm.addEventListener('submit', handleAvatarSubmit);

function handleAvatarSubmit(e) {
    e.preventDefault();

    const newAvatarUrl = avatarInput.value;
    const submitButton = e.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    if (avatarImage) {
        console.log('Обновление аватара:', newAvatarUrl);
        updateAvatar(newAvatarUrl)
            .then((data) => {
                avatarImage.style.backgroundImage = `url(${newAvatarUrl})`;
                console.log('Аватар успешно обновлен');
                closeModal(editAvatarPopup);
            })
            .catch((err) => {
                console.error('Ошибка при обновлении аватара:', err);
                alert('Ошибка обновления аватара. Попробуйте снова.');
            })
            .finally(() => {
                submitButton.textContent = 'Сохранить';
                submitButton.disabled = false;
            });
    } else {
        console.error('Элемент profile__image не найден');
    }
}

const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const profileTitleInput = document.querySelector('.popup__input_type_name');
const profileDescriptionInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

editProfileForm.addEventListener('submit', handleProfileSubmit);

export function handleProfileSubmit(e) {
    e.preventDefault();

    if (profileTitleInput.value.trim() === '' || profileDescriptionInput.value.trim() === '') {
        alert('Заполните все поля!');
        return;
    }

    const submitButton = e.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    updateProfile(profileTitleInput.value, profileDescriptionInput.value)
        .then(updatedProfile => {
            updateProfileDisplay(updatedProfile);
            closeModal(editProfilePopup);
        })
        .catch(err => {
            console.error('Ошибка при обновлении профиля:', err);
            alert('Ошибка обновления профиля. Попробуйте снова.');
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
            submitButton.disabled = false;
        });
}

function updateProfileDisplay({ name, about, avatar }) {
    profileTitle.textContent = name;
    profileDescription.textContent = about;
    avatarImage.style.backgroundImage = `url(${avatar})`;
}

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
    openModal(editProfilePopup);
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
});

export { handleAvatarSubmit };
