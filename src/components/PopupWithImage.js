import Popup from "./Popup.js";

export default class PopupImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".modal__preview-image");
    this._caption = this._popup.querySelector(".modal__preview-title");
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
