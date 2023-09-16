export class Actions {

  addClass(element, className) {
    element.classList.add(className);
  }

  removeClass(element, className) {
    element.classList.remove(className);
  }

  toggleClass(element, className) {
    element.classList.toggle(className);
  }
  
  addAttribute(element, ariaName, ariaValue) {
    console.log(element)
    element.setAttribute(ariaName, ariaValue);
  }
}
