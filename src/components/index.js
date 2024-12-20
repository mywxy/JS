import "../pages/index.css";
import avatarUrl from '../images/avatar.jpg';
import { enableValidation } from './validate.js';
import { openModal, closeModal } from './modal.js';
import { handleCardSubmit, createCard } from './card.js';
import { handleProfileSubmit } from './profile.js';
import { initialCards } from './cards.js';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarUrl})`;

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");

const openEditProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

openEditProfileButton.addEventListener("click", () => openModal(profilePopup));
addCardButton.addEventListener("click", () => openModal(cardPopup));

const places = document.querySelector(".places__list");
const cards = initialCards.map(createCard);
places.append(...cards);

const profileForm = profilePopup.querySelector('.popup__form[name="edit-profile"]');
profileForm.addEventListener("submit", handleProfileSubmit);

const newPlaceForm = cardPopup.querySelector('.popup__form[name="new-place"]');
newPlaceForm.addEventListener("submit", handleCardSubmit);

enableValidation();