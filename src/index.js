export default function Cursor(data) {
  this.name = 'custom-cursor'
  this.hoverTargets = data.hoverTargets || false
  this.browserCursor = data.browserCursor === false ? false : true
  this.secondCursor = data.secondCursor || false
}

Cursor.prototype.buildCursor = function () {
  const HTML = document.getElementsByTagName('html')[0]
  const BODY = document.getElementsByTagName('body')[0]
  const CURSOR = document.createElement('div')
  const STYLE = 'position: absolute; pointer-events: none;'

  CURSOR.setAttribute('id', this.name)
  CURSOR.setAttribute('class', this.name)
  CURSOR.style = STYLE
  BODY.append(CURSOR)

  if (this.secondCursor) {
    const SECOND_CURSOR = document.createElement('div')
    SECOND_CURSOR.setAttribute('id', `${this.name}-second`)
    SECOND_CURSOR.setAttribute('class', `${this.name}-second`)
    SECOND_CURSOR.style = STYLE
    BODY.append(SECOND_CURSOR)
  }

  if (!this.browserCursor) {
    HTML.style.cursor = 'none'
  }
}

Cursor.prototype.moveCursor = function () {
  const CURSOR = document.querySelector(`#${this.name}`)
  let SECOND_CURSOR

  if (this.secondCursor) {
    SECOND_CURSOR = document.querySelector(`#${this.name}-second`)
  }

  document.addEventListener('mousemove', function (event) {
    const { clientX, clientY } = event
    CURSOR.style.left = `${clientX - CURSOR.offsetWidth / 2}px`
    CURSOR.style.top = `${clientY - CURSOR.offsetHeight / 2}px`

    if (SECOND_CURSOR) {
      SECOND_CURSOR.style.left = `${clientX - SECOND_CURSOR.offsetWidth / 2}px`
      SECOND_CURSOR.style.top = `${clientY - SECOND_CURSOR.offsetHeight / 2}px`
    }
  })
}

Cursor.prototype.cursorStatus = function () {
  if (!this.hoverTargets) {
    return
  }

  for (const hoverTarget of this.hoverTargets) {
    const hoverTargetsArray = [...document.querySelectorAll(hoverTarget)]

    for (const _hoverTarget of hoverTargetsArray) {
      _hoverTarget.addEventListener('mouseover', this.cursorHover.bind(this, hoverTarget))
      _hoverTarget.addEventListener('mouseleave', this.cursorLeave.bind(this, hoverTarget))
    }
  }
}

Cursor.prototype.cursorHover = function (hoverTarget) {
  const BODY = document.getElementsByTagName('body')[0]
  const hoverTargetName = hoverTarget.replace(/[.#!]/g, '')
  BODY.classList.add(`${this.name}-hover--${hoverTargetName}`)
}

Cursor.prototype.cursorLeave = function (hoverTarget) {
  const BODY = document.getElementsByTagName('body')[0]
  const hoverTargetName = hoverTarget.replace(/[.#!]/g, '')
  BODY.classList.remove(`${this.name}-hover--${hoverTargetName}`)
}

Cursor.prototype.mount = function () {
  this.buildCursor()
  this.moveCursor()
  this.cursorStatus()
}
