export class Create {
  constructor() {}
  createElement(element) {
    const { type, src, className, text, innerHTML } = element;
    const createElement = document.createElement(type);
    createElement.classList.add(className);
    if (text) {
      createElement.innerText = text;
    }
    if (innerHTML) {
      createElement.innerHTML = innerHTML;
    }
    if (src) {
      createElement.src = src;
    }
    return createElement;
  }
}
