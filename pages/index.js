import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

// Elements //
const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
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

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(config, cardEditForm);
cardFormValidator.enableValidation();

// Functions //

function handleImageClick(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewTitle.textContent = name;
  openPopup(previewModal);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardListEl.prepend(cardElement);
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

  const card = new Card({ name, link }, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardListEl.prepend(cardElement);

  cardEditForm.reset();

  cardFormValidator.resetValidation(); // Clear input fields
  closePopup(cardAddModal); // Close the modal
}

// Event Listeners //

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openPopup(profileEditModal);
  profileFormValidator.resetValidation();
});

profileEditCloseButton.addEventListener("click", function () {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

cardAddButton.addEventListener("click", () => {
  cardEditForm.reset();
  cardFormValidator.resetValidation();
  openPopup(cardAddModal);
});

cardAddCloseButton.addEventListener("click", function () {
  closePopup(cardAddModal);
});

cardEditForm.addEventListener("submit", handleCardFormSubmit);

closePreviewModal.addEventListener("click", () => {
  closePopup(previewModal);
});

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

function addOverlayClickClose(modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closePopup(modal);
    }
  });
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

  // const modal = formEl.closest(".modal");
  if (modal) {
    addOverlayClickClose(modal);
  }
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
