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

// Elements //

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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

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

// Functions //

function openPopup(popup) {
  popup.classList.remove("modal_closing");
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.add("modal_closing");
  setTimeout(() => {
    popup.classList.remove("modal_opened", "modal_closing");
  }, 300);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  const cardLike = cardElement.querySelector(".card__like");

  cardLike.addEventListener("click", () => {
    cardLike.classList.toggle("card__like_active");
  });

  const cardDelete = cardElement.querySelector(".card__delete");

  cardDelete.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewTitle.textContent = cardData.name;
    openPopup(previewModal);
  });

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
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

  const newCard = getCardElement({ name, link });
  cardListEl.prepend(newCard);

  cardEditForm.reset(); // Clear input fields
  closePopup(cardAddModal); // Close the modal
}

// Event Listeners //

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");

  openPopup(profileEditModal);
});

profileEditCloseButton.addEventListener("click", function () {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

cardAddButton.addEventListener("click", () => {
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
