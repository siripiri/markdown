interface HTMLBuilder {
    build(): HTMLElement;
    appendTo(parent: HTMLElement): void;
}

// Header Builder
class HeaderBuilder implements HTMLBuilder {
    private element: HTMLHeadElement;

    constructor(line: string, level?: number) {
        if (level === undefined || level === null) {
            level = 0;
            for (let i = 0; i < line.length; i++) {
                if (line.charAt(i) === '#') level++;
                else break;
            }
        } else if (level > 2) {
            level = 2;
        }

        this.element = document.createElement(`h${level}`) as HTMLHeadElement;
        if(line.startsWith('#'))
            line = line.slice(level, line.length);
        this.element.innerHTML = line;
    }

    build(): HTMLElement {
        return this.element;
    }

    appendTo(parent: HTMLElement): void {
        parent.appendChild(this.element);
    }
}

// Break Builder
class BreakBuilder implements HTMLBuilder {
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
class LineBuilder implements HTMLBuilder {
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
class ParagraphBuilder implements HTMLBuilder {
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


export {
    HTMLBuilder,
    HeaderBuilder,
    BreakBuilder,
    LineBuilder,
    ParagraphBuilder
}