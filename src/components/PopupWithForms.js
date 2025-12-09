import popup from "./Popup.js";

class popupForms extends popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
