import { Data } from '../src/idata'

export default class CustomCursor {
  hoverTargets: string[]|boolean;
  browserCursor: boolean;
  secondCursor: boolean;

  name = "custom-cursor";
  secondName = "custom-cursor-second";
  defaultStyle = 'position: fixed; pointer-events: none;'
  bodyElement: HTMLBodyElement = document.getElementsByTagName("body")[0];
  htmlElement: HTMLHtmlElement = document.getElementsByTagName("html")[0];

  constructor(data: Data) {
    this.hoverTargets = data.hoverTargets || false;
    this.browserCursor = data.browserCursor || false;
    this.secondCursor = data.secondCursor || false;
  }

  build(): void {
    const mainCursor: HTMLDivElement = document.createElement("div");
    mainCursor.setAttribute("id", this.name);
    mainCursor.setAttribute("class", this.name);
    mainCursor.setAttribute('style', this.defaultStyle)
    this.bodyElement.append(mainCursor);

    if (this.secondCursor) {
      const secondCursor: HTMLDivElement = document.createElement("div");
      secondCursor.setAttribute("id", this.secondName);
      secondCursor.setAttribute("class", this.secondName);
      secondCursor.setAttribute('style', this.defaultStyle)
      this.bodyElement.append(secondCursor);
    }

    if (!this.browserCursor) {
      this.htmlElement.style.cursor = "none";
    }
  }

  move(): void {
    const mainCursor: HTMLElement | null = document.getElementById(this.name);
    const secondCursor: HTMLElement | null = document.getElementById(this.secondName);

    document.addEventListener("mousemove", function (event) {
      const { clientX, clientY } = event;

      if (mainCursor) {
        mainCursor.style.left = `${clientX - mainCursor.offsetWidth / 2}px`;
        mainCursor.style.top = `${clientY - mainCursor.offsetHeight / 2}px`;
      }

      if (secondCursor) {
        secondCursor.style.left = `${clientX - secondCursor.offsetWidth / 2}px`;
        secondCursor.style.top = `${clientY - secondCursor.offsetHeight / 2}px`;
      }
    });
  }

  status(): void {
    if (this.hoverTargets instanceof Array) {
      for (const hoverTarget of this.hoverTargets) {
        const hoverTargetsArray: NodeListOf<Element> = document.querySelectorAll(hoverTarget);

        for (const _hoverTarget of hoverTargetsArray) {
          _hoverTarget.addEventListener(
            "mouseover",
            this.hover.bind(this, hoverTarget)
          );
          _hoverTarget.addEventListener(
            "mouseleave",
            this.hover.bind(this, hoverTarget)
          )
        }
      }
    }
  }

  hover(hoverTarget: string): void {
    const targetName = hoverTarget.replace(/[.#!]/g, "");
    this.bodyElement.classList.toggle(`${this.name}-hover--${targetName}`);
  }

  mount(): void {
    this.build();
    this.move();
    this.status();
  }
}