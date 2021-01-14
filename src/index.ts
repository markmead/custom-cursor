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

  constructor(private data: Data) {
    this.hoverTargets = data.hoverTargets || false;
    this.browserCursor = data.browserCursor || false;
    this.secondCursor = data.secondCursor || false;
  }

  private init(): void {
    const mainCursor: HTMLDivElement = document.createElement("div");
    this.create(mainCursor, this.name)

    if (this.secondCursor) {
      const secondCursor: HTMLDivElement = document.createElement("div");
      this.create(secondCursor, this.secondName)
    }

    if (!this.browserCursor) {
      this.htmlElement.style.cursor = "none";
    }
  }

  private create(cursor: HTMLDivElement, name: string): void {
    cursor.setAttribute("id", name);
    cursor.setAttribute("class", name);
    cursor.setAttribute('style', this.defaultStyle)

    this.bodyElement.append(cursor);
  }

  private move(): void {
    const mainCursor: HTMLElement|null = document.getElementById(this.name);
    const secondCursor: HTMLElement|null = document.getElementById(this.secondName);

    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;

      if (mainCursor) {
        this.position(mainCursor, clientX, clientY)
      }

      if (secondCursor) {
        this.position(secondCursor, clientX, clientY)
      }
    });
  }

  private position(cursor: HTMLElement, x: number, y: number): void {
    cursor.style.left = `${x - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${y - cursor.offsetHeight / 2}px`;
  }

  private status(): void {
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

  private hover(hoverTarget: string): void {
    const targetName = hoverTarget.replace(/[.#!]/g, "");
    this.bodyElement.classList.toggle(`${this.name}-hover--${targetName}`);
  }

  mount(): void {
    this.init();
    this.move();
    this.status();
  }
}