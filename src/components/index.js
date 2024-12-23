import "../pages/index.css";
import { enableValidation } from './validate.js';
import { openModal, closeModal } from './modal.js';
import { handleCardSubmit, renderCards } from './card.js';
import { handleProfileSubmit, handleAvatarSubmit } from './profile.js';
import { loadUserInfo, loadCards } from './api.js';

let currentUserId;

document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo()
        .then((userData) => {
            console.log('Текущий пользователь ID:', userData._id);
            currentUserId = userData._id;
            return loadCards();
        })
        .then((cards) => {
            console.log('Загруженные карточки:', cards);
            renderCards(cards, currentUserId);
        })
        .catch(err => {
            console.error('Ошибка при загрузке пользовательской информации:', err);
        });
});

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");

const openEditProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

openEditProfileButton.addEventListener("click", () => openModal(profilePopup));
addCardButton.addEventListener("click", () => openModal(cardPopup));

const profileForm = profilePopup.querySelector('.popup__form[name="edit-profile"]');
profileForm.addEventListener("submit", handleProfileSubmit);

const newPlaceForm = cardPopup.querySelector('.popup__form[name="new-place"]');
newPlaceForm.addEventListener("submit", handleCardSubmit);

document.querySelector('.popup__form[name="edit-profile"]').addEventListener('submit', handleProfileSubmit);

const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarForm = editAvatarPopup.querySelector('.popup__form');
const avatarInput = editAvatarForm.querySelector('.popup__input_type_avatar-url');
const avatarEditIcon = document.querySelector('.profile__avatar-edit-icon');
const avatarImage = document.querySelector('.profile__image');

avatarEditIcon.addEventListener('click', () => {
    openModal(editAvatarPopup);
});

editAvatarForm.addEventListener('submit', handleAvatarSubmit);

enableValidation();
