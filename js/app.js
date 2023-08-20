const products = [
  {
    index: 1,
    title: "Pasteis",
    description: "lorem ipsulum dolor",
    img: "./img/images/aloo.png",
    value: 35,
    rating: 4.5,
    deliveryTime: 25,
  },
  {
    index: 2,

    title: "Bolinho de nozes",
    description: "lorem ipsulum dolor",
    img: "./img/images/bakked.png",
    value: 55,
    rating: 4.5,
    deliveryTime: 25,
  },
  {
    index: 3,
    title: "Bowl",
    description: "lorem ipsulum dolor",
    img: "./img/images/bowl.png",
    value: 78,
    rating: 4.1,
    deliveryTime: 35,
  },
  {
    index: 4,
    title: "Mexicano",
    description: "lorem ipsulum dolor",
    img: "./img/images/mexican.png",
    value: 12,
    rating: 3.8,
    deliveryTime: 10,
  },
  {
    index: 5,
    title: "Mix de Frutas",
    description: "lorem ipsulum dolor",
    img: "./img/images/mixed.png",
    value: 78,
    rating: 4.5,
    deliveryTime: 50,
  },
  {
    index: 6,
    title: "Sopa Panner",
    description: "lorem ipsulum dolor",
    img: "./img/images/panner.png",
    value: 85,
    rating: 4.1,
    deliveryTime: 30,
  },
  {
    index: 7,
    title: "Pizza",
    description: "lorem ipsulum dolor",
    img: "./img/images/pizza.png",
    value: 75,
    rating: 4.0,
    deliveryTime: 35,
  },
  {
    index: 8,
    title: "Ramachandra",
    description: "lorem ipsulum dolor",
    img: "./img/images/ramachandra.png",
    value: 25,
    rating: 4.9,
    deliveryTime: 55,
  },
  {
    index: 9,
    title: "Frango Empanado",
    description: "lorem ipsulum dolor",
    img: "./img/images/southwest.png",
    value: 45,
    rating: 4.5,
    deliveryTime: 25,
  },
  {
    index: 10,
    title: "Swap de Nozes",
    description: "lorem ipsulum dolor",
    img: "./img/images/swap.png",
    value: 105,
    rating: 4.5,
    deliveryTime: 25,
  },
  {
    index: 11,
    title: "Vegetariano",
    description: "lorem ipsulum dolor",
    img: "./img/images/vegetarian.png",
    value: 45,
    rating: 3.8,
    deliveryTime: 45,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const cart = [];

  class Actions {
    constructor() {
      this._modal = document.querySelector(".modal");
      this._cart = document.querySelector(".cart-container");
    }

    openModal() {
      this._modal.classList.remove("hidden");
      this._ariaHidden(false);
    }

    openCart() {
      this._cart.classList.remove("hidden");
      this._cart.classList.add("animation-cart");
    }

    closeModal() {
      this._modal.classList.add("hidden");
      this._ariaHidden(true);
    }

    closeCart() {
      this._cart.classList.add("hidden");
      this._cart.classList.remove("animation-cart")
    }

    _ariaHidden(openClose) {
      this._modal.setAttribute("aria-hidden", openClose);
    }

    _ariaHiddenCart(value) {
      this._cart.setAttribute("aria-hidden", value);
    }
  }

  class CreateElements {
    constructor() {}

    createElement(element) {
      const { type, className, text, innerHTML } = element;
      const createElement = document.createElement(type);
      createElement.classList.add(className);
      if (text) {
        createElement.innerText = text;
      }
      if (innerHTML) {
        createElement.innerHTML = innerHTML;
      }
      return createElement;
    }
  }

  class Modal extends CreateElements {
    constructor() {
      super();
      this._modal = document.querySelector(".modal");
      this._modalActions = new Actions();
    }

    modalSuccessAddProductToCart(product) {
      this._modal.innerHTML = "";

      const divModal = this.createElement({
        type: "div",
        className: "modal-item",
      });

      const button = this.createElement({
        type: "button",
        text: "X",
        className: "close",
      });
      button.addEventListener("click", () => this._modalActions.closeModal());

      const imagePicture = this.createElement({
        type: "picture",
      });
      const image = this.createElement({
        type: "img",
      });
      image.src = `${product.img}`;
      image.alt = "";

      imagePicture.append(image);

      const addSuccess = this.createElement({
        type: "div",
        className: "add-item",
        innerHTML: `<p>Esse item foi adicionado com sucesso no carrinho!</p>`,
      });

      divModal.innerHTML += `
        <div class="item-information">
          <h3>${product.title}</h3>
          <div class="item-description">
            <div class="ratings">
              <h5 class="ratings-stars">${product.rating}</h5>
              <p class="ratings-totals">Total de estrelas 100</p>
            </div>
            <div class="time">
              <h5 class="time-mins">${product.deliveryTime} Mins...</h5>
              <p>Tempo de preparo</p>
            </div>
            <div class="total">
              <h5 class="total-value">R$${product.value.toFixed(2)}</h5>
              <p>Total</p>
            </div>
          </div>
        </div>
      `;
      
      divModal.prepend(imagePicture);
      divModal.append(button);
      divModal.append(addSuccess);
      this._modal.append(divModal);

      this._modal.addEventListener("click", (event) => {
        if (event.target === this._modal) {
          this._modalActions.closeModal();
        }
      });

      this._modalActions.openModal();
    }
  }

  class Calculate {
    constructor() {
      this._quantityTop = document.querySelector(".quantity");
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
      this._quantityTop.innerText = this.calculateTotalQuantity();
    }

    calculateTotalQuantity() {
      return cart.reduce((total, item) => total + item.quantity, 0);
    }
  }

  class Cart extends CreateElements {
    constructor() {
      super();
      this._container = document.querySelector(".container");
      this._cartList = document.querySelector(".cart-list");
      this._cartValueTotal = document.querySelector(".cart-value__total");
      this._cartQuantity = document.querySelector(".cart-quantity");
      this._cart = document.querySelector(".cart-container");
      this._btnCartClose = document.querySelector(".cart-close");
      this._btnOpenCart = document.querySelector("span.cart");
      this._modal = new Modal();
      this._actionsCart = new Actions();
      this._calculate = new Calculate();

      this._btnCartClose.addEventListener("click", () => {
        this._actionsCart.closeCart();
        this._actionsCart._ariaHiddenCart(true);
      });

      this._btnOpenCart.addEventListener("click", () => {
        this._actionsCart.openCart();
        this._actionsCart._ariaHiddenCart(false);
      });

      document.addEventListener(
        "click",
        (event) => {
          if (this._cart.element) {
            return;
          }
          if (!this._cart.contains(event.target)) {
            this._actionsCart.closeCart();
            this._actionsCart._ariaHiddenCart(true);
          }
        },
        true
      );
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
          this._modal.modalSuccessAddProductToCart(product);
        }
      }

      this.updateCart();
      this._calculate.updateQuantityCart();
    }

    updateCart() {
      this._cartList.innerHTML = "";

      const cartItems = this.createElement({
        type: "h6",
        text: "Meus items",
        className: "cart-list__title",
      });
      this._cartList.append(cartItems);

      cart.forEach((cartItem) => {
        const cartItemElement = this.createElement({
          type: "li",
          className: "cart-list__items",
        });
        cartItemElement.innerHTML = `
          <div class="cart-list__name">
            <picture class="cart-list__image">
              <img src="${cartItem.product.img}" alt="" />
            </picture>
            <div class="cart-list__quantity">
              <h6>${cartItem.product.title}</h6>
              <p class="cart-quantity">R$ ${cartItem.product.value.toFixed(
                2
              )}</p>
            </div>
          </div>
        `;

        const divActions = this.createElement({
          type: "div",
          className: "cart-list__actions",
        });

        const btnDecrease = this.createElement({
          type: "button",
          className: "decrease",
          text: "-",
        });
        btnDecrease.addEventListener("click", () =>
          this.manageCartItem(cartItem.product, false)
        );

        const btnIncrease = this.createElement({
          type: "button",
          className: "increase",
          text: "+",
        });
        btnIncrease.addEventListener("click", () =>
          this.manageCartItem(cartItem.product, true)
        );

        const spanQuantity = this.createElement({
          type: "span",
          className: "cart-list__quantity",
          text: cartItem.quantity,
        });

        divActions.append(btnDecrease);
        divActions.append(spanQuantity);
        divActions.append(btnIncrease);

        cartItemElement.append(divActions);
        this._cartList.append(cartItemElement);
      });

      this._cartValueTotal.innerText = `R$ ${this._calculate
        .calculateTotalCartValue()
        .toFixed(2)}`;
      this._cartQuantity.innerText = `Total de items ${this._calculate.calculateTotalQuantity()}`;
    }
  }

  class Render extends Cart {
    constructor() {
      super();
      this._inputSearch = document.querySelector(".input-search");

      this._inputSearch.addEventListener("input", (event) => {
        const searchTerm = event.target.value.trim();
        items.renderSearchedProducts(searchTerm);
      });
    }

    matchesSearchTerm(product, searchTerm) {
      const title = product.title.toLowerCase();
      return title.includes(searchTerm.toLowerCase());
    }

    createSearchedCard(product, searchTerm) {
      if (this.matchesSearchTerm(product, searchTerm)) {
        return this.createCard(product);
      }
      return null;
    }

    createCard(product) {
      const card = this.createElement({
        type: "div",
        className: "card",
      });

      const button = this.createElement({
        type: "button",
        className: "card-button",
        text: "Carrinho",
      });
      button.addEventListener("click", () =>
        this.manageCartItem(product, true, "modal")
      );

      const picture = this.createElement({
        type: "picture",
        className: "image",
      });
      const img = this.createElement({
        type: "img",
      });
      img.src = `${product.img}`;
      picture.append(img);

      const h4 = this.createElement({
        type: "h4",
        className: "card-title",
        text: product.title,
      });

      const divAvaliation = this.createElement({
        type: "div",
        className: "avaliation",
      });
      const description = this.createElement({
        type: "p",
        text: product.description,
      });
      const spanStars = this.createElement({
        type: "span",
        className: "star",
        text: product.rating,
      });
      divAvaliation.append(description);
      divAvaliation.append(spanStars);

      const values = this.createElement({
        type: "div",
        className: "values",
      });
      const spanValues = this.createElement({
        type: "span",
        className: "value",
        text: `R$ ${product.value.toFixed(2)}`,
      });
      const spanMins = this.createElement({
        type: "span",
        className: "mins",
        text: `${product.deliveryTime} Mins...`,
      });
      values.append(spanValues);
      values.append(spanMins);

      card.append(picture);
      card.append(h4);
      card.append(divAvaliation);
      card.append(values);
      card.append(button);

      return card;
    }

    renderSearchedProducts(searchTerm) {
      this._container.innerHTML = "";

      products.forEach((product) => {
        const card = this.createSearchedCard(product, searchTerm);
        if (card) {
          this._container.append(card);
        }
      });
    }
  }
  const items = new Render();
  items.renderSearchedProducts("");
});
