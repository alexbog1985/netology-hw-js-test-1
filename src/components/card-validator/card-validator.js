import "./card-validator.css";

export default class CardValidator {
  constructor(element) {
    if (typeof element === "string") {
      this.element = document.querySelector(element);
    }

    this.input = this.element.querySelector(".input-text");
    this.button = this.element.querySelector(".validate-button");
    this.icons = this.element.querySelectorAll(".payment-icon__pic");

    this.onClickValidateButton = this.onClickValidateButton.bind(this);

    this.button.addEventListener("click", this.onClickValidateButton);
  }

  onClickValidateButton(e) {
    e.preventDefault();

    const cardNumber = this.input.value.replace(/\s/g, "");

    if (!cardNumber) {
      console.log("Введите номер карты");
      return;
    }
  }

  getCardType(cardNumber) {
    const types = {
      visa:
    }
  }
}
