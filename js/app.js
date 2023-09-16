import { ActionsCart } from "../actions/actionsCart.mjs";
import { ActionsMenu } from "../actions/actionsMenu.mjs";
import { ActionsModal } from "../actions/actionsModal.mjs";
import { cardsList } from "../components/cardsList/cardList.mjs";

document.addEventListener("DOMContentLoaded", () => {
  class App {
    constructor() {
      this.actionsCart = new ActionsCart();
      this.actionsMenu = new ActionsMenu();
      this.modal = new ActionsModal;
      this.cardsList = new cardsList;
    }
    initialize() {
      this.cardsList.renderSearchedProducts("");
    }
  }
  const initApp = new App();
  initApp.initialize();
});
