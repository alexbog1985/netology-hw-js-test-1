import CardValidator from "../components/card-validator/card-validator";

const cardValidatorWidget = document.querySelector(".widget-container");

const cardValidator = new CardValidator(cardValidatorWidget);

cardValidator.init();
