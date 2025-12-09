export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like_active");
    });

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImageElement = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like");
    this._deleteButton = this._element.querySelector(".card__delete");

    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
