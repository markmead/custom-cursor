export default function createCursor(configOptions = {}) {
  const documentBody = document.body

  const cursorCount = configOptions.count || 1
  const cursorStyle = 'position: fixed; pointer-events: none; top: 0; left: 0;'

  const hoverTargets = configOptions.targets || false

  function initializeCursors() {
    const cursorElements = Array.from(
      { length: cursorCount },
      (_, indexPosition) => indexPosition
    )

    for (const [indexPosition] of cursorElements.entries()) {
      const cursorElement = document.createElement('div')
      createCursorElement(cursorElement, indexPosition)
    }
  }

  function createCursorElement(cursorElement, indexPosition) {
    cursorElement.setAttribute('data-cursor', `${indexPosition}`)
    cursorElement.setAttribute('style', cursorStyle)

    documentBody.append(cursorElement)
  }

  function trackMouseMovement() {
    const cursorElements = document.querySelectorAll('[data-cursor]')

    document.addEventListener('mousemove', (mouseEvent) => {
      const { clientX, clientY } = mouseEvent

      for (const cursorElement of cursorElements) {
        updateCursorPosition(cursorElement, clientX, clientY)
      }
    })
  }

  function updateCursorPosition(cursorElement, xPosition, yPosition) {
    cursorElement.style.transform = `translate3d(calc(${xPosition}px - 50%), calc(${yPosition}px - 50%), 0)`
  }

  function setupHoverEffects() {
    if (!Array.isArray(hoverTargets)) {
      return
    }

    for (const targetSelector of hoverTargets) {
      const targetElements = document.querySelectorAll(targetSelector)

      for (const targetElement of targetElements) {
        targetElement.addEventListener('mouseover', () => {
          toggleHoverState(targetSelector)
        })

        targetElement.addEventListener('mouseleave', () => {
          toggleHoverState(targetSelector)
        })
      }
    }
  }

  function toggleHoverState(targetSelector) {
    const targetName = targetSelector.replace(/[.#!]/g, '')

    documentBody.classList.toggle(`cursor-hover--${targetName}`)
  }

  initializeCursors()
  trackMouseMovement()
  setupHoverEffects()
}
