import { Actions } from "./actions.mjs";

export class ActionsCart extends Actions{
  constructor() {
    super();
    this.cart = document.querySelector(".cart-container");
  }

  openCart() {
    this.addClass(this.cart, "animation-cart");
    this.removeClass(this.cart, "hidden");
    this.addAttribute(this.cart, "aria-hidden", false);
  }
  
  closeCart() {
    this.addClass(this.cart, "hidden");
    this.removeClass(this.cart, "animation-cart");
    this.addAttribute(this.cart, "aria-hidden", true);
  }
}
