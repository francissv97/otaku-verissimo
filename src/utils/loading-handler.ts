import shortLogo from "@/assets/logo-short.svg";

class LoadingHandler {
  private element: HTMLElement | null;

  constructor() {
    const container = document.createElement("div");
    container.id = "center-loading-bounce";
    container.className = "fixed top-0 z-40 flex h-full w-full items-center justify-center duration-300 pointer-events-none";

    const child = document.createElement("div");
    child.className = "w-44";

    const img = document.createElement("img");
    img.src = shortLogo;
    img.alt = "Center loading with logo (ov)";
    img.className = "animate-bounce opacity-40";

    child.appendChild(img);
    container.appendChild(child);

    this.element = container;
  }

  show() {
    if (!this.element) return;
    document.body.appendChild(this.element);
  }

  hidde() {
    if (!this.element) return;
    this.element.remove();
  }
}

export const loadingHandler = new LoadingHandler();
