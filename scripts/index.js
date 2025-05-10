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
const profileEditModal = document.querySelector("#edit-popup");
const profileEditCloseButton =
  profileEditModal.querySelector("#edit-close-button");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#name-input");
const profileDescriptionInput = document.querySelector("#description-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardAddModal = document.querySelector("#add-popup");
const cardAddButton = document.querySelector("#add-button");
const cardAddCloseButton = cardAddModal.querySelector("#edit-close-button");
const cardEditForm = document.querySelector(".modal__form");
const cardNameInput = document.querySelector("#name-input");
const cardLinkInput = document.querySelector("#description-input");

// Functions //

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

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

  closePopup();
}

function handleCardFormSubmit(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput;

  closePopup();
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

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

initialCards.forEach(function (obj) {
  console.log(obj);
});
