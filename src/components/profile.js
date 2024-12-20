import { closeModal } from './modal.js';

export function handleProfileSubmit(e) {
  e.preventDefault();
  
  const profileTitleInput = document.querySelector('.popup__input_type_name');
  const profileDescriptionInput = document.querySelector('.popup__input_type_description');

  if (profileTitleInput.value.trim() === '' || profileDescriptionInput.value.trim() === '') {
    alert('Заполните все поля!');
    return;
  }

  document.querySelector(".profile__title").textContent = profileTitleInput.value;
  document.querySelector(".profile__description").textContent = profileDescriptionInput.value;

  closeModal(document.querySelector(".popup_type_edit"));
}