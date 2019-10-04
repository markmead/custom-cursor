export default function Cursor(attrs) {
  this.id = attrs.id || "js-cursor";
  this.hovers = attrs.hovers || null;
  this.cursor = attrs.cursor === false ? false : true;
}

Cursor.prototype.create = function() {
  const cursor = document.createElement("div");
  const parent = document.getElementsByTagName("body")[0];
  const html = document.getElementsByTagName("html")[0];

  cursor.setAttribute("id", this.id);
  cursor.setAttribute("class", this.id);
  cursor.style = `position: absolute; pointer-events: none;`;
  parent.append(cursor);

  if (!this.cursor) html.style.cursor = "none";
};

Cursor.prototype.status = function() {
  document.addEventListener("mousemove", this.moving.bind(this));

  if (this.hovers === null) return;

  for (const hover of this.hovers) {
    const targets = [...document.querySelectorAll(hover)];
    for (const target of targets) {
      target.addEventListener(
        "mouseover",
        this.hover.bind(this, target, hover)
      );
      target.addEventListener(
        "mouseleave",
        this.leave.bind(this, target, hover)
      );
    }
  }
};

Cursor.prototype.moving = function() {
  const cursor = document.getElementById(this.id);
  const { pageX, pageY } = event;
  const posX = `${pageX - cursor.offsetWidth / 2}px`;
  const posY = `${pageY - cursor.offsetHeight / 2}px`;

  cursor.style.left = posX;
  cursor.style.top = posY;
};

Cursor.prototype.hover = function(target, hover) {
  const cursor = document.getElementById(this.id);
  const name = target.getAttribute("data-class");

  cursor.classList.add(`${this.id}--${hover}`);
};

Cursor.prototype.leave = function(target, hover) {
  const cursor = document.getElementById(this.id);
  const name = target.getAttribute("data-class");

  cursor.classList.remove(`${this.id}--${hover}`);
};

Cursor.prototype.init = function() {
  this.create();
  this.status();
};
