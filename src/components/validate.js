export function validateInput(input) {
  const errorMessage = input.nextElementSibling;

  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      errorMessage.textContent = 'Это поле обязательно для заполнения.';
    } else if (input.validity.tooShort) {
      errorMessage.textContent = `Минимум ${input.minLength} символов.`;
    } else if (input.type === 'url' && input.validity.typeMismatch) {
      errorMessage.textContent = 'Введите корректный URL.';
    } else {
      errorMessage.textContent = 'Некорректное значение.';
    }
  } else {
    errorMessage.textContent = '';
  }
}

export function toggleSaveButton(form) {
  const inputs = form.querySelectorAll('input');
  const saveButton = form.querySelector('.popup__button[type="submit"]');
  const allValid = [...inputs].every(input => input.validity.valid);
  saveButton.disabled = !allValid;
  saveButton.classList.toggle('popup__button_disabled', !allValid);
}

export function enableValidation() {
  const forms = document.querySelectorAll('.popup__form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        validateInput(input);
        toggleSaveButton(form);
      });
    });
    toggleSaveButton(form);
  });
}