import { Actions } from "./actions.mjs";

export class ActionsModal extends Actions {
  constructor() {
    super();
    this.modal = document.querySelector(".modal");
  }

  openModal() {
    this.removeClass(this.modal, "hidden");
    this.addAttribute(this.modal, "aria-hidden", false);
  }
  
  closeModal() {
    this.addClass(this.modal, "hidden");
    this.addAttribute(this.modal, "aria-hidden", false);
  }
}
