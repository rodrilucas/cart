import { Create } from "../../utils/createElements.mjs";
import { ActionsModal } from "../../actions/actionsModal.mjs";

export class ModalItem extends ActionsModal {
  constructor() {
    super();
    this.modal = document.querySelector(".modal");
    this.create = new Create();
  }
  
  render(product) {
    const divModal = this.create.createElement({
      type: "div",
      className: "modal-item",
    });

    const button = this.create.createElement({
      type: "button",
      text: "X",
      className: "close",
    });
    button.addEventListener("click", () => this.closeModal());

    const imagePicture = this.create.createElement({
      type: "picture",
    });
    const image = this.create.createElement({
      type: "img",
    });
    image.src = `${product.img}`;
    image.alt = "";
    imagePicture.append(image);

    const addSuccess = this.create.createElement({
      type: "div",
      className: "add-item",
      innerHTML: `<p>Esse item foi adicionado com sucesso no carrinho!</p>`,
    });

    const itemInformationDiv = this.create.createElement({
      type: "div",
      className: "item-information",
    });
    const titleH3 = this.create.createElement({
      type: "h3",
      text: product.title,
    });
    const itemDescriptionDiv = this.create.createElement({
      type: "div",
      className: "item-description",
    });

    const ratingsDiv = this.create.createElement({
      type: "div",
      className: "ratings",
    });
    const ratingsStarsH5 = this.create.createElement({
      type: "h5",
      className: "ratings-stars",
      text: product.rating,
    });
    const ratingsTotalsP = this.create.createElement({
      type: "p",
      className: "ratings-totals",
      text: "Total de estrelas 100",
    });
    ratingsDiv.append(ratingsStarsH5, ratingsTotalsP);

    const timeDiv = this.create.createElement({
      type: "div",
      className: "time",
    });
    const timeMinsH5 = this.create.createElement({
      type: "h5",
      className: "time-mins",
      text: `${product.deliveryTime} Mins...`,
    });
    const timePrepP = this.create.createElement({
      type: "p",
      text: "Tempo de preparo",
    });
    timeDiv.append(timeMinsH5, timePrepP);

    const totalDiv = this.create.createElement({
      type: "div",
      className: "total",
    });
    const totalValueH5 = this.create.createElement({
      type: "h5",
      className: "total-value",
      text: `R$${product.value.toFixed(2)}`,
    });
    const totalP = this.create.createElement({
      type: "p",
      text: "Total",
    });
    totalDiv.append(totalValueH5, totalP);
    itemDescriptionDiv.append(ratingsDiv, timeDiv, totalDiv);
    itemInformationDiv.append(titleH3, itemDescriptionDiv);

    divModal.prepend(imagePicture);
    divModal.append(itemInformationDiv, button, addSuccess);

    this.modal.append(divModal);

    this.modal.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.closeModal();
      }
    });

    this.openModal();
  }
  
  modalSuccessAddProductToCart(product) {
    this.modal.innerHTML = "";
    this.render(product);
  }
}
