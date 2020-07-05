export default function Cursor(data) {
  this.name = 'custom-cursor'
  this.hoverTargets = data.hoverTargets || false
  this.browserCursor = data.browserCursor === false ? false : true
  this.secondCursor = data.secondCursor || false
  this.htmlEl = document.getElementsByTagName('html')[0]
  this.bodyEl = document.getElementsByTagName('body')[0]
}

Cursor.prototype.buildCursor = function () {
  const mainCursor = document.createElement('div')
  const defaultStyle = 'position: fixed; pointer-events: none;'

  mainCursor.setAttribute('id', this.name)
  mainCursor.setAttribute('class', this.name)
  mainCursor.style = defaultStyle
  this.bodyEl.append(mainCursor)

  if (this.secondCursor) {
    const secondCursor = document.createElement('div')
    secondCursor.setAttribute('id', `${this.name}-second`)
    secondCursor.setAttribute('class', `${this.name}-second`)
    secondCursor.style = defaultStyle
    this.bodyEl.append(secondCursor)
  }

  if (!this.browserCursor) this.htmlEl.style.cursor = 'none'
}

Cursor.prototype.moveCursor = function () {
  const mainCursor = document.querySelector(`#${this.name}`)
  let secondCursor = this.secondCursor ? document.querySelector(`#${this.name}-second`) : null

  document.addEventListener('mousemove', function (event) {
    const { clientX, clientY } = event
    let mainPosX = clientX - mainCursor.offsetWidth / 2
    let mainPosY = clientY - mainCursor.offsetHeight / 2

    mainCursor.style.left = `${mainPosX}px`
    mainCursor.style.top = `${mainPosY}px`

    if (secondCursor) {
      let secondPosX = clientX - secondCursor.offsetWidth / 2
      let secondPosY = clientY - secondCursor.offsetHeight / 2
      secondCursor.style.left = `${secondPosX}px`
      secondCursor.style.top = `${secondPosY}px`
    }
  })
}

Cursor.prototype.cursorStatus = function () {
  if (!this.hoverTargets) return

  for (const hoverTarget of this.hoverTargets) {
    const hoverTargetsArray = [...document.querySelectorAll(hoverTarget)]

    for (const _hoverTarget of hoverTargetsArray) {
      _hoverTarget.addEventListener('mouseover', this.handleHover.bind(this, hoverTarget))
      _hoverTarget.addEventListener('mouseleave', this.handleHover.bind(this, hoverTarget))
    }
  }
}

Cursor.prototype.handleHover = function (hoverTarget) {
  const targetName = hoverTarget.replace(/[.#!]/g, '')
  this.bodyEl.classList.toggle(`${this.name}-hover--${targetName}`)
}

Cursor.prototype.mount = function () {
  this.buildCursor()
  this.moveCursor()
  this.cursorStatus()
}
