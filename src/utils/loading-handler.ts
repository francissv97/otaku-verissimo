import shortLogo from '@/assets/logo-short.svg'

class LoadingHandler {
  private element: HTMLElement | null

  constructor() {
    this.element = this.loading()
  }

  private loading() {
    const container = document.createElement('div')
    container.id = 'center-loading-bounce'
    container.className =
      'fixed top-0 z-40 flex h-full w-full items-center justify-center pointer-events-none'

    const child = document.createElement('div')
    child.className = 'w-44 animete-ping'

    const img = document.createElement('img')
    img.src = shortLogo
    img.alt = 'Center loading with logo (ov)'
    img.className = 'opacity-75 animate-pulse'

    child.appendChild(img)
    container.appendChild(child)

    return container
  }

  show() {
    if (!this.element) return
    this.element.style.opacity = '0'
    this.element.style.transform = 'scale(0.1)'
    document.body.appendChild(this.element)
    requestAnimationFrame(() => {
      if (this.element) {
        this.element.style.transition = 'all 300ms ease-in-out'
        this.element.style.transform = 'scale(1)'
        this.element.style.opacity = '1'
      }
    })
  }

  hidde() {
    if (!this.element) return
    this.element.style.transform = 'scale(2)'
    this.element.style.opacity = '0'
    this.element.addEventListener('transitionend', () => {
      if (this.element) {
        this.element?.remove()
      }
      this.element = this.loading()
    })
  }
}

export const loadingHandler = new LoadingHandler()
