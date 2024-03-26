class IntersectionObserverHandler {
  private observer: IntersectionObserver | null
  private options: IntersectionObserverInit
  private callback: (() => void) | null
  private observableElement: Element | null

  constructor(options: IntersectionObserverInit) {
    this.options = options
    this.callback = null
    this.observer = null
    this.observableElement = null
  }

  init(element: Element, callback: () => void) {
    if (!this.observer) {
      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.options)
    }
    this.observableElement = element
    this.callback = callback
  }

  observe() {
    if (this.observer && this.observableElement) {
      this.observer.observe(this.observableElement)
    }
  }

  unobserve(element?: Element) {
    if (this.observer && element === this.observableElement) {
      this.observer.unobserve(element)
      return
    }

    if (this.observer && this.observableElement) {
      this.observer.unobserve(this.observableElement)
    }
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && this.callback) {
        this.callback()
      }
    })
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

export const intersectionObserverHandler = new IntersectionObserverHandler({
  threshold: 0.95,
})
