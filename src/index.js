export default function Cursor(data) {
  this.cursorName = 'custom-cursor'
  this.secondCursorName = 'custom-cursor-second'
  this.hoverTargets = data.hoverTargets || false
  this.browserCursor = data.browserCursor === false ? false : true
  this.secondCursor = data.secondCursor || false
  this.htmlEl = document.getElementsByTagName('html')[0]
  this.bodyEl = document.getElementsByTagName('body')[0]
}

Cursor.prototype.buildCursor = function () {
  const mainCursor = document.createElement('div')
  const defaultStyle = 'position: fixed; pointer-events: none;'

  mainCursor.setAttribute('id', this.cursorName)
  mainCursor.setAttribute('class', this.cursorName)
  mainCursor.style = defaultStyle
  this.bodyEl.append(mainCursor)

  if (this.secondCursor) {
    const secondCursor = document.createElement('div')
    secondCursor.setAttribute('id', this.secondCursorName)
    secondCursor.setAttribute('class', this.secondCursorName)
    secondCursor.style = defaultStyle
    this.bodyEl.append(secondCursor)
  }

  if (!this.browserCursor) this.htmlEl.style.cursor = 'none'
}

Cursor.prototype.moveCursor = function () {
  const mainCursor = document.getElementById(this.cursorName)
  const secondCursor = document.getElementById(this.secondCursorName)

  document.addEventListener('mousemove', function (event) {
    const { clientX, clientY } = event

    mainCursor.style.left = `${clientX - mainCursor.offsetWidth / 2}px`
    mainCursor.style.top = `${clientY - mainCursor.offsetHeight / 2}px`

    if (secondCursor) {
      secondCursor.style.left = `${clientX - secondCursor.offsetWidth / 2}px`
      secondCursor.style.top = `${clientY - secondCursor.offsetHeight / 2}px`
    }
  })
}

Cursor.prototype.cursorStatus = function () {
  if (!this.hoverTargets) return

  for (const hoverTarget of this.hoverTargets) {
    const hoverTargetsArray = document.querySelectorAll(hoverTarget)

    for (const _hoverTarget of hoverTargetsArray) {
      _hoverTarget.addEventListener('mouseover', this.handleHover.bind(this, hoverTarget))
      _hoverTarget.addEventListener('mouseleave', this.handleHover.bind(this, hoverTarget))
    }
  }
}

Cursor.prototype.handleHover = function (hoverTarget) {
  const targetName = hoverTarget.replace(/[.#!]/g, '')
  this.bodyEl.classList.toggle(`${this.cursorName}-hover--${targetName}`)
}

Cursor.prototype.mount = function () {
  this.buildCursor()
  this.moveCursor()
  this.cursorStatus()
}
