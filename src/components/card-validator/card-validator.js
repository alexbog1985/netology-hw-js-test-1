import "./card-validator.css";

export default class CardValidator {
  constructor(element) {
    if (typeof element === "string") {
      this.element = document.querySelector(element);
    }

    this.input = this.element.querySelector(".input-text");
    this.button = this.element.querySelector(".validate-button");
    this.icons = this.element.querySelectorAll(".payment-icon__pic");
    this.messageElement = null;

    this.onClickValidateButton = this.onClickValidateButton.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.button.addEventListener("click", this.onClickValidateButton);
    this.input.addEventListener("input", this.onInputChange);

    this.createMessageElement();
    this.updateIcons();
  }

  createMessageElement() {
    this.messageElement = document.createElement("div");
    this.messageElement.className = "validation-result";
    this.element.appendChild(this.messageElement);
  }

  onClickValidateButton(e) {
    e.preventDefault();
    this.validate();
  }

  onInputChange() {
    this.updateIcons();
    this.clearResult();
  }

  clearResult() {
    this.messageElement.textContent = "";
    this.messageElement.className = "validation-result";
  }

  showResult(message, isValid) {
    this.messageElement.textContent = message;
    this.messageElement.className = `Результат проверки: ${isValid ? "Ok" : "Not Valid"}`;
  }

  luhnCheck(cardNumber) {
    let sum = 0;
    let double = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i], 10);

      if (double) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      double = !double;
    }

    return sum % 10 === 0;
  }

  getCardType(cardNumber) {
    const patterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      "american express": /^3[47][0-9]{13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
      "diners club": /^3[0689][0-9]{12,14}$/,
    };

    for (const [type, regex] of Object.entries(patterns)) {
      if (regex.test(cardNumber)) {
        return type;
      }
    }
  }

  updateIcons() {
    const cardNumber = this.input.value.replace(/\s/g, "");
    const cardType = this.getCardType(cardNumber);

    this.icons.forEach((icon) => {
      icon.classList.remove("active-icon__pic");
    });

    if (cardType) {
      const activeIcon = Array.from(this.icons).find(
        (icon) => icon.alt.toLowerCase() === cardType,
      );
      if (activeIcon) {
        activeIcon.classList.add("active-icon__pic");
      }
    }
  }

  validate() {
    const cardNumber = this.input.value.replace(/\s/g, "");

    if (!cardNumber) {
      this.showResult("Введите номер карты", false);
      return;
    }

    if (!/^\d+$/.test(cardNumber)) {
      this.showResult("Должны быть только цифры", false);
      return;
    }

    const cardType = this.getCardType(cardNumber);

    if (!cardType) {
      this.showResult("Неизвестная карта", false);
      return;
    }

    if (this.luhnCheck(cardNumber)) {
      this.showResult(`Карта определена: (${cardType})`, true);
    } else {
      this.showResult("Неверный номер карты", false);
    }
  }
}
