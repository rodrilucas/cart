import { Create } from "../../utils/createElements.mjs";
import { CartItem } from "../cart/cartItem.mjs";

export class CardItem extends Create{
  constructor() {
    super();
    this.cart = new CartItem();
  }
  render(product) {
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
      this.cart.manageCartItem(product, true, "modal")
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
    divAvaliation.append(description, spanStars);

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
    values.append(spanValues, spanMins);

    card.append(picture, h4, divAvaliation, values, button);

    return card;
  }
}
