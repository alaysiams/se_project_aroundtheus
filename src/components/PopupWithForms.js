import Popup from "./Popup.js";

export default class Popupform extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._form.querySelectorAll("input"));
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
