import "./card-validator.css";

export default class CardValidator {
  constructor(element) {
    this.element = element;

    this.onClickValidateButton = this.onClickValidateButton.bind(this);
  }

  init() {
    this.input = this.element.querySelector(".input-text");
    this.button = this.element.querySelector(".validate-button");
    this.icons = this.element.querySelectorAll(".payment-icon__pic");

    this.button.addEventListener("click", this.onClickValidateButton);
  }

  onClickValidateButton(btn) {
    btn.preventDefault();
    console.log(btn);
  }
}
