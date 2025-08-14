function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}
function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function toggleButtonState(inputEls, submitButtonEl, options) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    submitButtonEl.classList.add(options.inactiveButtonClass);
    submitButtonEl.disabled = true;
  } else {
    submitButtonEl.classList.remove(options.inactiveButtonClass);
    submitButtonEl.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButtonEl = formEl.querySelector(submitButtonSelector);

  toggleButtonState(inputEls, submitButtonEl, options);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButtonEl, options);
    });
  });

  const closeModal = formEl.closest(".modal").querySelector(".modal__close");

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      closePopup(formEl.closest(".modal"));
    });
  }
}

function closePopup(modal) {
  modal.classList.add("modal_closing");

  modal.addEventListener(
    "animationend",
    () => {
      modal.classList.remove("modal_opened", "modal_closing");
      modal.style.display = "none";
    },
    { once: true }
  );
}

function openPopup(modal) {
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("modal_opened");
  });
}

function addOverlayClickClose(modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closePopup(modal);
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_opened");
    if (openedModal) {
      closePopup(openedModal);
    }
  }
});

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);

    const modal = formEl.closest(".modal");
    if (modal) {
      addOverlayClickClose(modal);
    }
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: "input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
