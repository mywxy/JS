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
  document.addEventListener('keydown', closeByEsc);
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
};