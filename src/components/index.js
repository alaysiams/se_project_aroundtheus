import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, config } from "../utils/utils.js";
import "../pages/index.css";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupImage from "./PopupWithImage.js";
import Popupform from "./PopupWithForms.js";

// User Info

const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: ".profile__description",
});

// Form Validation
const formValidators = {};

function enableValidation(config) {
  document.querySelectorAll(config.formSelector).forEach((form) => {
    const validator = new FormValidator(config, form);
    formValidators[form.getAttribute("name")] = validator;
    validator.enableValidation();
  });
}

enableValidation(config);

// Image Pop-Up

const imagePopup = new PopupImage("#preview");
imagePopup.setEventListeners();

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

// Render Card Section

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      cardSection.addItem(card.generateCard());
    },
  },
  ".cards__list"
);
cardSection.renderItems();

// Add Card Pop-Up

const addCardPopup = new Popupform("#add-popup", (data) => {
  const card = new Card(
    {
      name: data.title,
      link: data.description,
    },
    "#card-template",
    (cardData) => imagePopup.open(cardData)
  );
  cardSection.addItem(card.generateCard());
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// Profile Pop-Up

const profilePopup = new Popupform("#modal-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.title,
    job: formData.description,
  });

  profilePopup.close();
});

profilePopup.setEventListeners();

// Evt Listeners

document.querySelector("#profile-edit-button").addEventListener("click", () => {
  profilePopup.open();
});

document.querySelector("#add-button").addEventListener("click", () => {
  addCardPopup.open();
  formValidators["card-form"].resetValidation();
});
