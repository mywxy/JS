import { closeModal, openImagePopup } from './modal.js';

export function createCard({ name, link }) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);

  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  image.src = link;
  image.alt = name;
  title.textContent = name;

  image.addEventListener("click", () => {
    openImagePopup(link, name);
  });

  likeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const cardToRemove = deleteButton.closest(".card");
    if (cardToRemove) {
      cardToRemove.remove();
    }
  });

  return card;
}

export function handleCardSubmit(e) {
  e.preventDefault();

  const cardNameInput = document.querySelector('.popup__input_type_card-name');
  const cardLinkInput = document.querySelector('.popup__input_type_url');
  
  const newCard = createCard({ name: cardNameInput.value, link: cardLinkInput.value });
  document.querySelector(".places__list").prepend(newCard);
  
  closeModal(document.querySelector(".popup_type_new-card"));
}