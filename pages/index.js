import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../components/card.js";

// Elements //
const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  formSelector: ".modal__form",
};

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#modal-popup");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-form");
const cardListEl = document.querySelector(".cards__list");

const cardAddModal = document.querySelector("#add-popup");
const cardAddButton = document.querySelector("#add-button");
const cardAddCloseButton = cardAddModal.querySelector("#card-close-button");
const cardEditForm = document.querySelector("#card-form");
const cardNameInput = document.querySelector("#card-name-input");
const cardLinkInput = document.querySelector("#card-description-input");

const previewModal = document.querySelector("#preview");
const previewImage = previewModal.querySelector(".modal__preview-image");
const closePreviewModal = document.querySelector("#preview-close-button");
const previewTitle = previewModal.querySelector(".modal__preview-title");

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;

    validator.enableValidation();
  });
};

enableValidation(config);

// Functions //

function handleImageClick(cardInstance) {
  previewImage.src = cardInstance.link;
  previewImage.alt = cardInstance.name;
  previewTitle.textContent = cardInstance.name;
  openPopup(previewModal);
}

// Event Handlers //

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(profileEditModal);
}

function handleCardFormSubmit(e) {
  e.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  renderCard({ name, link });

  cardEditForm.reset();

  formValidators["card-form"].resetValidation(); // Clear input fields
  closePopup(cardAddModal); // Close the modal
}

// Event Listeners //

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openPopup(profileEditModal);
  formValidators["profile-form"].resetValidation();
});

profileEditCloseButton.addEventListener("click", function () {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

cardAddButton.addEventListener("click", () => {
  cardEditForm.reset();
  openPopup(cardAddModal);
});

cardAddCloseButton.addEventListener("click", function () {
  closePopup(cardAddModal);
});

cardEditForm.addEventListener("submit", handleCardFormSubmit);

closePreviewModal.addEventListener("click", () => {
  closePopup(previewModal);
});

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardEl = card.generateCard();
  cardListEl.prepend(cardEl);
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

function addOverlayClickClose(modal) {
  if (!modal._overlayClickBound) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closePopup(modal);
      }
    });
    modal._overlayClickBound = true;
  }
}

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_opened");
    if (openedModal) {
      closePopup(openedModal);
    }
  }
}

function openPopup(modal) {
  modal.style.display = "flex";
  modal.classList.remove("modal_closing");

  requestAnimationFrame(() => {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscapeKey);
  });

  addOverlayClickClose(modal);
}

function closePopup(modal) {
  modal.classList.add("modal_closing");

  function onClose() {
    modal.classList.remove("modal_opened", "modal_closing");
    modal.style.display = "none";
    document.removeEventListener("keydown", handleEscapeKey);
  }

  modal.addEventListener("animationend", onClose, { once: true });

  setTimeout(() => {
    if (modal.classList.contains("modal_closing")) {
      onClose();
    }
  }, 300);
}
