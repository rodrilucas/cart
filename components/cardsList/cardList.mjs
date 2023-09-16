import { CardItem } from "../cardItem/cardItem.mjs";
import { products } from "../../products.mjs";

export class cardsList extends CardItem {
  constructor() {
    super();
    this.inputSearch = document.querySelector(".input-search");
    this.container = document.querySelector(".container");

    this.inputSearch.addEventListener("input", (event) => {
      const searchTerm = event.target.value.trim();
      this.renderSearchedProducts(searchTerm);
    });
  }

  matchesSearchTerm(product, searchTerm) {
    const title = product.title.toLowerCase();
    return title.includes(searchTerm.toLowerCase());
  }

  createSearchedCard(product, searchTerm) {
    if (this.matchesSearchTerm(product, searchTerm)) {
      return this.render(product);
    }
    return null;
  }

  renderSearchedProducts(searchTerm) {
    this.container.innerHTML = "";

    products.forEach((product) => {
      const card = this.createSearchedCard(product, searchTerm);
      if (card) {
        this.container.append(card);
      }
    });
  }
}
