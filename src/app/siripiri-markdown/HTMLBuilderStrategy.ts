import { HeaderBuilder, HTMLBuilder } from "./HTMLBuilder";

export interface HTMLBuilderStrategy {
    match(lines: string[], currentIndex: number): boolean;
    build(lines: string[], currentIndex: number, htmlBuilders: HTMLBuilder[]): number;
}

export class HeaderBuilderStrategy implements HTMLBuilderStrategy {
    match(lines: string[], currentIndex: number): boolean {
        return this.isHeader(lines[currentIndex]);
    }
    build(lines: string[], currentIndex: number, htmlBuilders: HTMLBuilder[]): number {
        htmlBuilders.push(new HeaderBuilder(lines[currentIndex]));
        return 1;
    }
    private isHeader(line: string): boolean {
        if(!line.startsWith('#'))
            return false;
        let level = 0;
        for(let i=0; i<line.length; i++) {
            if(line.charAt(i) === '#') {
                level ++;
                if(level > 6) return false;
            }
            else if(line.charAt(i) === ' ') {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}