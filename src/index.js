export default function Cursor(attrs) {
  this.id = attrs.id || "js-cursor";
  this.hovers = attrs.hovers || null;
  this.cursor = attrs.cursor || true;
  this.ele = document.getElementById(this.id);
}

Cursor.prototype.create = function() {
  const cursor = document.createElement("div");
  const parent = document.getElementsByTagName("body")[0];

  cursor.setAttribute("id", this.id);
  cursor.setAttribute("class", this.id);
  cursor.style = `position: absolute; pointer-events: none;`;
  parent.append(cursor);

  if (!this.cursor) parent.style.cursor = "none";
};

Cursor.prototype.status = function() {
  if (this.hovers === null) return;

  document.addEventListener("mousemove", this.moving.bind(this));

  for (const hover of this.hovers) {
    const targets = [...document.querySelectorAll(hover)];
    for (const target of targets) {
      target.addEventListener("mouseover", this.hover.bind(this, target));
      target.addEventListener("mouseleave", this.leave.bind(this, target));
    }
  }
};

Cursor.prototype.moving = function() {
  const cursor = this.ele;
  const { pageX, pageY } = event;
  const posX = `${pageX - cursor.offsetWidth / 2}px`;
  const posY = `${pageY - cursor.offsetHeight / 2}px`;

  cursor.style.left = posX;
  cursor.style.top = posY;
};

Cursor.prototype.hover = function(hover) {
  if (this.hovers === null) return;
  const cursor = this.ele;
  const name = hover.getAttribute("data-class");

  cursor.classList.add(`${this.id}--${name}`);
};

Cursor.prototype.leave = function(hover) {
  const cursor = this.ele;
  const name = hover.getAttribute("data-class");

  cursor.classList.remove(`${this.id}--${name}`);
};

Cursor.prototype.init = function() {
  this.create();
  this.status();
};
