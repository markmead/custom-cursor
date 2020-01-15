export default function Cursor(data) {
  this.name = "_cursor";
  this.hoverTargets = data.hoverTargets || false;
  this.browserCursor = data.browserCursor === false ? false : true;
  this.secondCursor = data.secondCursor || false;
}

Cursor.prototype.buildCursor = function() {
  const HTML = document.getElementsByTagName("html")[0];
  const BODY = document.getElementsByTagName("body")[0];
  const CURSOR = document.createElement("div");
  const STYLE = "position: absolute; pointer-events: none;";

  HTML.style.overflow = "hidden";

  CURSOR.setAttribute("id", this.name);
  CURSOR.setAttribute("class", this.name);
  CURSOR.style = STYLE;
  BODY.append(CURSOR);

  if (this.secondCursor) {
    const SECOND_CURSOR = document.createElement("div");
    SECOND_CURSOR.setAttribute("id", `${this.name}-second`);
    SECOND_CURSOR.setAttribute("class", `${this.name}-second`);
    SECOND_CURSOR.style = STYLE;
    BODY.append(SECOND_CURSOR);
  }

  if (!this.browserCursor) {
    HTML.style.cursor = "none";
  }
};

Cursor.prototype.moveCursor = function() {
  const CURSOR = document.querySelector("#_cursor");
  let SECOND_CURSOR;

  if (this.secondCursor) {
    SECOND_CURSOR = document.querySelector("#_cursor-second");
  }

  document.addEventListener("mousemove", function(event) {
    const { pageX, pageY } = event;
    CURSOR.style.left = `${pageX - CURSOR.offsetWidth / 2}px`;
    CURSOR.style.top = `${pageY - CURSOR.offsetHeight / 2}px`;

    if (SECOND_CURSOR) {
      SECOND_CURSOR.style.left = `${pageX - SECOND_CURSOR.offsetWidth / 2}px`;
      SECOND_CURSOR.style.top = `${pageY - SECOND_CURSOR.offsetHeight / 2}px`;
    }
  });
};

Cursor.prototype.cursorStatus = function() {
  if (!this.hoverTargets) {
    return;
  }

  for (const hoverTarget of this.hoverTargets) {
    const hoverTargetsArray = [...document.querySelectorAll(hoverTarget)];

    for (const _hoverTarget of hoverTargetsArray) {
      _hoverTarget.addEventListener(
        "mouseover",
        this.cursorHover.bind(this, hoverTarget)
      );
      _hoverTarget.addEventListener(
        "mouseleave",
        this.cursorLeave.bind(this, hoverTarget)
      );
    }
  }
};

Cursor.prototype.cursorHover = function(hoverTarget) {
  const BODY = document.getElementsByTagName("body")[0];
  const hoverTargetName = hoverTarget.replace(/[.#!]/g, "");
  BODY.classList.add(`_cursor-hover--${hoverTargetName}`);
};

Cursor.prototype.cursorLeave = function(hoverTarget) {
  const BODY = document.getElementsByTagName("body")[0];
  const hoverTargetName = hoverTarget.replace(/[.#!]/g, "");
  BODY.classList.remove(`_cursor-hover--${hoverTargetName}`);
};

Cursor.prototype.mount = function() {
  this.buildCursor();
  this.moveCursor();
  this.cursorStatus();
};
