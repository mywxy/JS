const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

[profilePopup, cardPopup, imagePopup].forEach(popup => popup.classList.add("popup_is-animated"));

const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

const cards = initialCards.map(createCard);
const places = document.querySelector(".places__list");
places.append(...cards);

const profileForm = profilePopup.querySelector(".popup__form");

const openEditProfileButton = document.querySelector(".profile__edit-button");
const closeEditProfileButton = profilePopup.querySelector(".popup__close");
const addCardButton = document.querySelector(".profile__add-button");
const closeCardButton = cardPopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = profilePopup.querySelector(".popup__input_type_name");
const profileDescriptionInput = profilePopup.querySelector(".popup__input_type_description");

const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");

function toggleModal(popup) {
  popup.classList.toggle("popup_is-opened");
}

function openModal(popup) {
  popup.style.visibility = 'visible';
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  
  setTimeout(() => {
    popup.style.visibility = 'hidden';
  }, 300);
}

openEditProfileButton.addEventListener("click", () => {
  openModal(profilePopup);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});
closeEditProfileButton.addEventListener("click", () => closeModal(profilePopup));
addCardButton.addEventListener("click", () => {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openModal(cardPopup);
});
closeCardButton.addEventListener("click", () => closeModal(cardPopup));

places.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("card__image")) {
    const card = target.closest(".card");
    const name = card.querySelector(".card__title").textContent;
    const link = target.src;
    
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
  } else if (target.classList.contains("card__like-button")) {
    target.classList.toggle("card__like-button_is-active");
  } else if (target.classList.contains("card__delete-button")) {
    target.closest(".card").remove();
  }
});

function createCard({ name, link }) {
  const card = document.importNode(document.querySelector("#card-template").content, true);
  const image = card.querySelector(".card__image");
  
  image.src = link;
  image.alt = name;
  card.querySelector(".card__title").textContent = name;

  return card;
}

function handleFormSubmit(e, type) {
  e.preventDefault();
  
  if (type === 'profile') {
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profilePopup);
  } else if (type === 'card') {
    const newCard = createCard({ name: cardNameInput.value, link: cardLinkInput.value });
    places.prepend(newCard);
    closeModal(cardPopup);
  }
}

profileForm.addEventListener("submit", (e) => handleFormSubmit(e, 'profile'));
cardPopup.querySelector(".popup__form").addEventListener("submit", (e) => handleFormSubmit(e, 'card'));