export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameEl.textContent,
      job: this._jobEl.textContent,
    };
  }

  setUserInfo({ name, job }) {
    if (name) this._nameEl.textContent = name;
    if (job) this._jobEl.textContent = job;
  }
}
