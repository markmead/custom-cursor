interface CursorInterface {
  count?: number
  targets?: string[] | boolean
}

export default class Cursor {
  count: number
  targets: string[] | boolean

  style = 'position: fixed; pointer-events: none; top: 0; left: 0;'
  body = document.querySelector('body') as HTMLBodyElement

  constructor(private data: CursorInterface) {
    this.count = this.data.count || 1
    this.targets = this.data.targets || false

    this.init()
    this.move()
    this.status()
  }

  private init(): void {
    const cursors = new Array(this.count).fill(0)

    cursors.forEach((_, index) => {
      const cursor: HTMLDivElement = document.createElement('div')

      this.create(cursor, index)
    })
  }

  private create(cursor: HTMLDivElement, index: number): void {
    cursor.setAttribute('data-cursor', `${index}`)
    cursor.setAttribute('style', this.style)

    this.body.append(cursor)
  }

  private move(): void {
    const cursors: NodeListOf<Element> =
      document.querySelectorAll('[data-cursor]')

    document.addEventListener('mousemove', (event) => {
      const { clientX, clientY } = event

      cursors.forEach((cursor) =>
        this.position(cursor as HTMLDivElement, clientX, clientY)
      )
    })
  }

  private position(cursor: HTMLDivElement, x: number, y: number): void {
    cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
  }

  private status(): void {
    if (this.targets instanceof Array) {
      for (const target of this.targets) {
        const targetEls: NodeListOf<Element> = document.querySelectorAll(target)

        for (const el of targetEls) {
          el.addEventListener('mouseover', this.hover.bind(this, target))
          el.addEventListener('mouseleave', this.hover.bind(this, target))
        }
      }
    }
  }

  private hover(hoverTarget: string): void {
    const name = hoverTarget.replace(/[.#!]/g, '')

    this.body.classList.toggle(`cursor-hover--${name}`)
  }
}
