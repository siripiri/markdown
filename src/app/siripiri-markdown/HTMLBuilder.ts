export interface HTMLBuilder {
  build(): HTMLElement;
  appendTo(parent: HTMLElement): void;
}

// Header Builder
export class HeaderBuilder implements HTMLBuilder {
  private element: HTMLHeadElement;

  constructor(line: string, level?: number) {
    if (level === undefined || level === null) {
      level = 0;
      for (let i = 0; i < line.length; i++) {
        if (line.charAt(i) === '#') level++;
        else break;
      }
    } else if(level > 2) {
        level = 2;
    }

    this.element = document.createElement(`h${level}`) as HTMLHeadElement;
    this.element.textContent = line.slice(level, line.length);
  }

  build(): HTMLElement {
    return this.element;
  }

  appendTo(parent: HTMLElement): void {
    parent.appendChild(this.element);
  }
}

// Break Builder
export class BreakBuilder implements HTMLBuilder {
  private element: HTMLBRElement;

  constructor() {
    this.element = document.createElement(`br`) as HTMLBRElement;
  }

  build(): HTMLElement {
    return this.element;
  }

  appendTo(parent: HTMLElement): void {
    parent.appendChild(this.element);
  }
}

// Line Builder
export class LineBuilder implements HTMLBuilder {
  private element: HTMLHRElement;

  constructor() {
    this.element = document.createElement(`hr`) as HTMLHRElement;
  }

  build(): HTMLElement {
    return this.element;
  }

  appendTo(parent: HTMLElement): void {
    parent.appendChild(this.element);
  }
}

// Paragraph Builder
export class ParagraphBuilder implements HTMLBuilder {
  private element: HTMLParagraphElement;

  constructor(line: string) {
    this.element = document.createElement(`p`) as HTMLParagraphElement;
    this.element.innerHTML = line;
  }

  build(): HTMLElement {
    return this.element;
  }

  appendTo(parent: HTMLElement): void {
    parent.appendChild(this.element);
  }
}
