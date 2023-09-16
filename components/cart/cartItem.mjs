import { Create } from "../../utils/createElements.mjs";
import { ActionsCart } from "../../actions/actionsCart.mjs";
import { ModalItem } from "../modal/modalItem.mjs";
import { Calculate } from "../../utils/calculate.mjs";

export const cart = [];

export class CartItem extends ActionsCart {
  constructor() {
    super();
    this.create = new Create();
    this.modal = new ModalItem();
    this.calculate = new Calculate();

    this.container = document.querySelector(".container");

    this.cartList = document.querySelector(".cart-list");
    this.cartValueTotal = document.querySelector(".cart-value__total");
    this.cartQuantity = document.querySelector(".cart-quantity");
    this.cart = document.querySelector(".cart-container");

    this.btnCartClose = document.querySelector(".cart-close");
    this.btnOpenCart = document.querySelector("span.cart");

    this.btnOpenCart.addEventListener("click", () => {
      this.openCart();
    });

    this.btnCartClose.addEventListener("click", () => {
      this.closeCart();
    });

    document.addEventListener(
      "click",
      (event) => {
        if (this.cart.element) {
          return;
        }
        if (!this.cart.contains(event.target)) {
          this.closeCart();
        }
      },
      true
    );
  }

  render(cartItem) {
    console.log(cartItem.product.img)
    const cartItemElement = this.create.createElement({
      type: "li",
      className: "cart-list__items",
    });

    const cartListNameDiv = this.create.createElement({
      type: "div",
      className: "cart-list__name",
    });
    const pictureElement = this.create.createElement({
      type: "picture",
      className: "cart-list__image",
    });
    const imgElement = this.create.createElement({
      type: "img",
      src: cartItem.product.img,
      className: "img",
      alt: "",
    });
    pictureElement.append(imgElement);

    const cartListQuantityDiv = this.create.createElement({
      type: "div",
      className: "cart-list__quantity",
    });
    const titleH6 = this.create.createElement({
      type: "h6",
      text: cartItem.product.title,
    });
    const cartQuantityP = this.create.createElement({
      type: "p",
      className: "cart-quantity",
      text: `R$ ${cartItem.product.value.toFixed(2)}`,
    });
    cartListQuantityDiv.append(titleH6, cartQuantityP);

    const divActions = this.create.createElement({
      type: "div",
      className: "cart-list__actions",
    });
    const btnDecrease = this.create.createElement({
      type: "button",
      className: "decrease",
      text: "-",
    });
    btnDecrease.addEventListener("click", () =>
      this.manageCartItem(cartItem.product, false)
    );
    const btnIncrease = this.create.createElement({
      type: "button",
      className: "increase",
      text: "+",
    });
    btnIncrease.addEventListener("click", () =>
      this.manageCartItem(cartItem.product, true)
    );
    const spanQuantity = this.create.createElement({
      type: "span",
      className: "cart-list__quantity",
      text: cartItem.quantity,
    });

    cartListNameDiv.append(pictureElement, cartListQuantityDiv);

    divActions.append(btnDecrease, spanQuantity, btnIncrease);

    cartItemElement.append(cartListNameDiv, divActions);

    return cartItemElement;
  }

  manageCartItem(product, increase = true, addCart = "") {
    const existingCartItem = cart.find(
      (item) => item.product.index === product.index
    );

    if (existingCartItem) {
      if (increase) {
        existingCartItem.quantity += 1;
      } else if (existingCartItem.quantity > 1) {
        existingCartItem.quantity -= 1;
      } else {
        const itemIndex = cart.indexOf(existingCartItem);
        if (itemIndex !== -1) {
          cart.splice(itemIndex, 1);
        }
      }
    } else if (increase || addCart === "modal") {
      cart.push({ product: product, quantity: 1 });
      if (addCart === "modal") {
        this.modal.modalSuccessAddProductToCart(product);
      }
    }

    this.updateCart();
    this.calculate.updateQuantityCart();
  }

  updateCart() {
    this.cartList.innerHTML = "";

    const cartItems = this.create.createElement({
      type: "h6",
      text: "Meus items",
      className: "cart-list__title",
    });
    this.cartList.append(cartItems);

    cart.forEach((cartItem) => {
      const cart = this.render(cartItem);
      this.cartList.append(cart);
    });

    this.cartValueTotal.innerText = `R$ ${this.calculate
      .calculateTotalCartValue()
      .toFixed(2)}`;
    this.cartQuantity.innerText = `Total de items ${this.calculate.calculateTotalQuantity()}`;
  }
}
