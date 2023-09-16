import { cart } from "../components/cart/cartItem.mjs";

export class Calculate {
  constructor() {
    this.quantityTop = document.querySelector(".quantity");
  }

  calculateCartItemTotal(cartItem) {
    return cartItem.product.value * cartItem.quantity;
  }

  calculateTotalCartValue() {
    return cart.reduce(
      (total, cartItem) => total + this.calculateCartItemTotal(cartItem),
      0
    );
  }

  updateQuantityCart() {
    this.quantityTop.innerText = this.calculateTotalQuantity();
  }

  calculateTotalQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
}
