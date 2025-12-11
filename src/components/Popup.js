export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEScClose = this._handleEScClose.bind(this);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEScClose);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEScClose);
  }

  _handleEScClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (e) => {
      if (
        e.target === this._popup ||
        e.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
