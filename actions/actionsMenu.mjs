import { Actions } from "./actions.mjs";

export class ActionsMenu extends Actions {
  constructor() {
    super();
    this.form = document.querySelector(".form-search");
    this.btnHamburguer = document.querySelector(".button-hamburguer");
    this.navigation = document.querySelector(".navigation");
    this.animationMenu = document.querySelector(".right");
    this.topMenu = document.querySelector(".header-top");
    this.isMenuOpen = false;

    this.checkScreenSizeAndAddClassMenuMobile =
      this.checkScreenSizeAndAddClassMenuMobile.bind(this);

    window.addEventListener("load", this.checkScreenSizeAndAddClassMenuMobile);
    window.addEventListener(
      "resize",
      this.checkScreenSizeAndAddClassMenuMobile
    );

    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        this.addClass(this.topMenu, "fixed-menu");
      } else {
        this.removeClass(this.topMenu, "fixed-menu");
      }
    });

    this.btnHamburguer.addEventListener("click", () => {
      const currentState = this.btnHamburguer.getAttribute("data-state");
      if (!currentState || currentState === "closed") {
        this.addAnimationHamburguer();
        this.showMenuMobile();
      } else {
        const ariaExpanded = false;
        this.removeAnimationHamburguer();
        this.showMenuMobile(ariaExpanded);
      }
    });
  }

  addAnimationHamburguer() {
    this.addAttribute(this.btnHamburguer, "data-state", "opened");
    this.addAttribute(this.btnHamburguer, "aria-expanded", "true");
  }

  removeAnimationHamburguer() {
    this.addAttribute(this.btnHamburguer, "data-state", "closed");
    this.addAttribute(this.btnHamburguer, "aria-expanded", "false");
  }

  showMenuMobile(ariaExpanded = "true") {
    this.addAttribute(this.form, "aria-expanded", ariaExpanded);
    this.addAttribute(this.btnHamburguer, "aria-hidden", false);
    this.addAttribute(this.navigation, "aria-expanded", ariaExpanded);
    this.toggleClass(this.form, "hidden");
    this.toggleClass(this.navigation, "hidden");
    this.toggleClass(this.form, "animation-cart");
    this.toggleClass(this.navigation, "animation-cart");
  }

  screenSizeAddClassMenuMobile() {
    this.removeClass(this.btnHamburguer, "hidden");
    this.addAttribute(this.btnHamburguer, "aria-hidden", "false");
    this.addClass(this.form, "hidden");
    this.addClass(this.navigation, "hidden");
  }
  
  screenSizeRemoveClassMenuMobile() {
    this.addClass(this.btnHamburguer, "hidden");
    this.addAttribute(this.btnHamburguer, "aria-hidden", "true");
    this.removeClass(this.form, "hidden");
    this.removeClass(this.navigation, "hidden");
  }

  checkScreenSizeAndAddClassMenuMobile() {
    const isMobileSize = window.innerWidth <= 992;

    if (isMobileSize) {
      this.screenSizeAddClassMenuMobile();
    } else {
      this.screenSizeRemoveClassMenuMobile();
    }
  }
}
